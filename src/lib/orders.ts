"use client";

import { useSyncExternalStore } from "react";

export type OrderStatus = "Preparing" | "Ready" | "Picked up";
export type OrderType = "Dine-in" | "Takeout";
export type PaymentMethod = "Cash on pickup" | "E-wallet";

export interface OrderLine {
  name: string;
  quantity: number;
  unitPrice: number;
  options: string;
}

export interface Order {
  id: string;
  customer: string;
  orderType: OrderType;
  payment: PaymentMethod;
  notes: string;
  pickup: string;
  items: OrderLine[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  readyAt: number;
}

export interface NewOrder {
  customer: string;
  orderType: OrderType;
  payment: PaymentMethod;
  notes: string;
  pickup: string;
  items: OrderLine[];
  total: number;
  prepMinutes: number;
}

const STORAGE_KEY = "campuscafe-orders-v2";
const EVENT = "campuscafe:orders-changed";
const EMPTY: Order[] = [];

let cachedRaw: string | null = null;
let cached: Order[] = EMPTY;

function readOrders(): Order[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY;
    const parsed = JSON.parse(saved) as Order[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Order[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = readOrders();
  }
  return cached;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function commit(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  cachedRaw = null;
  window.dispatchEvent(new Event(EVENT));
}

export function useOrders() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function createOrder(input: NewOrder): Order {
  const now = Date.now();
  const { prepMinutes, ...rest } = input;
  const order: Order = {
    ...rest,
    id: `CC-${now.toString().slice(-5)}`,
    status: "Preparing",
    createdAt: now,
    readyAt: now + Math.max(1, prepMinutes) * 60000,
  };
  commit([order, ...readOrders()]);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  commit(
    readOrders().map((order) =>
      order.id === id ? { ...order, status } : order,
    ),
  );
}

export function removeOrder(id: string) {
  commit(readOrders().filter((order) => order.id !== id));
}

export function clearOrders() {
  commit([]);
}

export function autoReadyOrders(now: number): string[] {
  if (typeof window === "undefined") return [];
  const orders = readOrders();
  const due = orders.filter(
    (order) => order.status === "Preparing" && order.readyAt <= now,
  );
  if (due.length === 0) return [];
  commit(
    orders.map((order) =>
      order.status === "Preparing" && order.readyAt <= now
        ? { ...order, status: "Ready" }
        : order,
    ),
  );
  return due.map((order) => order.id);
}

export const orderStatuses: OrderStatus[] = ["Preparing", "Ready", "Picked up"];

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function statusStyles(status: OrderStatus) {
  switch (status) {
    case "Preparing":
      return "bg-amber-400/10 text-amber-300 ring-amber-400/30";
    case "Ready":
      return "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30";
    case "Picked up":
      return "bg-slate-400/10 text-slate-300 ring-slate-400/30";
  }
}
