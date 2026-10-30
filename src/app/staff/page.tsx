"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ToastStack from "@/components/ToastStack";
import { formatPrice, menuItems } from "@/data/mockMenu";
import {
  isItemAvailable,
  resetAvailability,
  setItemAvailability,
  useAvailability,
} from "@/lib/availability";
import { CART_KEY } from "@/lib/cart";
import {
  autoReadyOrders,
  clearOrders,
  formatCountdown,
  orderStatuses,
  removeOrder,
  statusStyles,
  updateOrderStatus,
  useOrders,
  type Order,
  type OrderStatus,
} from "@/lib/orders";
import { useToasts } from "@/lib/useToasts";

const PICKUP_KEY = "campuscafe-pickup-v1";

const columnAccents: Record<OrderStatus, string> = {
  Preparing: "bg-amber-400",
  Ready: "bg-emerald-400",
  "Picked up": "bg-slate-400",
};

export default function StaffPage() {
  const orders = useOrders();
  const availability = useAvailability();
  const [now, setNow] = useState(0);
  const { toasts, push, dismiss } = useToasts();

  useEffect(() => {
    function tick() {
      const timestamp = Date.now();
      setNow(timestamp);
      const ready = autoReadyOrders(timestamp);
      ready.forEach((id) => {
        push({
          title: `Order ${id} is ready`,
          message: "The customer has been notified on the order tracker.",
          tone: "success",
        });
      });
    }
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [push]);

  const preparing = orders.filter((order) => order.status === "Preparing");
  const ready = orders.filter((order) => order.status === "Ready");
  const pickedUp = orders.filter((order) => order.status === "Picked up");
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const itemsSold = orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((count, item) => count + item.quantity, 0),
    0,
  );
  const soldOutCount = menuItems.filter(
    (item) => !isItemAvailable(availability, item.id, item.available),
  ).length;

  function advance(order: Order) {
    if (order.status === "Preparing") {
      updateOrderStatus(order.id, "Ready");
      push({
        title: `${order.id} is ready`,
        message: `Notify ${order.customer} at the pickup counter.`,
        tone: "success",
      });
    } else if (order.status === "Ready") {
      updateOrderStatus(order.id, "Picked up");
      push({
        title: `${order.id} picked up`,
        message: "Order moved to completed.",
        tone: "info",
      });
    }
  }

  function remove(order: Order) {
    removeOrder(order.id);
    push({
      title: `${order.id} removed`,
      message: "Order cleared from the board.",
      tone: "info",
    });
  }

  function toggleItem(id: string, name: string, current: boolean) {
    setItemAvailability(id, !current);
    push({
      title: `${name} marked ${current ? "sold out" : "available"}`,
      message: current
        ? "Customers can no longer add this item."
        : "Customers can order this item again.",
      tone: current ? "error" : "success",
    });
  }

  function resetDemo() {
    clearOrders();
    resetAvailability();
    window.localStorage.removeItem(CART_KEY);
    window.localStorage.removeItem(PICKUP_KEY);
    push({
      title: "Demo reset",
      message: "Orders, menu availability, cart, and pickup time were cleared.",
      tone: "info",
    });
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
            Cafeteria operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Staff order board
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Track incoming orders, move them through preparation, and switch
            menu items between available and sold out.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/prototype"
            className="glass-soft rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Customer view
          </Link>
          <button
            type="button"
            onClick={resetDemo}
            className="glass-soft rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Reset demo
          </button>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="In queue" value={`${preparing.length}`} tone="amber" />
        <StatCard label="Ready" value={`${ready.length}`} tone="emerald" />
        <StatCard label="Picked up" value={`${pickedUp.length}`} tone="slate" />
        <StatCard label="Items sold" value={`${itemsSold}`} tone="cyan" />
        <StatCard label="Revenue" value={formatPrice(revenue)} tone="rose" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {orderStatuses.map((status) => {
          const columnOrders = orders.filter(
            (order) => order.status === status,
          );
          return (
            <div key={status} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${columnAccents[status]}`}
                  />
                  <h2 className="text-sm font-semibold text-white">{status}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                  {columnOrders.length}
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {columnOrders.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-slate-500">
                    No orders in this stage.
                  </p>
                ) : (
                  columnOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      now={now}
                      onAdvance={() => advance(order)}
                      onRemove={() => remove(order)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Menu availability
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Toggle items so customers see accurate stock in real time.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
            {soldOutCount} sold out
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => {
            const available = isItemAvailable(
              availability,
              item.id,
              item.available,
            );
            return (
              <div
                key={item.id}
                className="glass flex items-center justify-between gap-3 rounded-xl p-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.category} · {formatPrice(item.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id, item.name, available)}
                  aria-pressed={available}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset transition ${
                    available
                      ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30 hover:bg-emerald-400/20"
                      : "bg-rose-400/10 text-rose-300 ring-rose-400/30 hover:bg-rose-400/20"
                  }`}
                >
                  {available ? "Available" : "Sold out"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </main>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "emerald" | "slate" | "cyan" | "rose";
}) {
  const toneClasses: Record<typeof tone, string> = {
    amber: "text-amber-300",
    emerald: "text-emerald-300",
    slate: "text-slate-300",
    cyan: "text-cyan-300",
    rose: "text-rose-300",
  };
  return (
    <div className="glass rounded-xl px-4 py-3">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-1 text-xl font-semibold ${toneClasses[tone]}`}>
        {value}
      </p>
    </div>
  );
}

function OrderCard({
  order,
  now,
  onAdvance,
  onRemove,
}: {
  order: Order;
  now: number;
  onAdvance: () => void;
  onRemove: () => void;
}) {
  const remaining = order.readyAt - (now || order.createdAt);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{order.id}</p>
          <p className="text-[11px] text-slate-500">
            {order.customer} · Pickup {order.pickup}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusStyles(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      <ul className="mt-2 space-y-0.5 text-xs text-slate-400">
        {order.items.map((line) => (
          <li key={line.name + line.options} className="flex justify-between gap-2">
            <span>
              {line.quantity}× {line.name}
              {line.options ? (
                <span className="block text-[10px] text-slate-500">
                  {line.options}
                </span>
              ) : null}
            </span>
            <span>{formatPrice(line.unitPrice * line.quantity)}</span>
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-amber-200/80">
          Note: {order.notes}
        </p>
      )}

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          {order.orderType} · {order.payment}
        </span>
        <span className="font-semibold text-slate-200">
          {formatPrice(order.total)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2">
        {order.status === "Preparing" ? (
          <span className="text-[11px] font-medium text-amber-300">
            {remaining > 0
              ? `Ready in ${formatCountdown(remaining)}`
              : "Ready to serve"}
          </span>
        ) : order.status === "Ready" ? (
          <span className="text-[11px] font-medium text-emerald-300">
            Awaiting pickup
          </span>
        ) : (
          <span className="text-[11px] text-slate-500">Completed</span>
        )}

        {order.status === "Picked up" ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Clear
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdvance}
            className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-[11px] font-semibold text-slate-900 transition hover:from-amber-300 hover:to-orange-400"
          >
            {order.status === "Preparing" ? "Mark ready" : "Picked up"}
          </button>
        )}
      </div>
    </div>
  );
}
