"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { formatPrice } from "@/data/mockMenu";
import { cartTotal, type CartLine } from "@/lib/cart";
import type { Order, OrderType, PaymentMethod } from "@/lib/orders";

type Step = "details" | "review" | "receipt";

interface CheckoutDetails {
  customer: string;
  orderType: OrderType;
  payment: PaymentMethod;
  notes: string;
}

const orderTypes: OrderType[] = ["Dine-in", "Takeout"];
const paymentMethods: PaymentMethod[] = ["Cash on pickup", "E-wallet"];

export default function CheckoutSheet({
  lines,
  pickup,
  onPlace,
  onClose,
}: {
  lines: CartLine[];
  pickup: string;
  onPlace: (details: CheckoutDetails) => Order;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("details");
  const [customer, setCustomer] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("Takeout");
  const [payment, setPayment] = useState<PaymentMethod>("Cash on pickup");
  const [notes, setNotes] = useState("");
  const [placed, setPlaced] = useState<Order | null>(null);

  const total = cartTotal(lines);
  const validName = customer.trim().length >= 2;

  const title =
    step === "receipt"
      ? "Order confirmed"
      : step === "review"
        ? "Review your order"
        : "Checkout details";

  function handlePlace() {
    const order = onPlace({
      customer: customer.trim(),
      orderType,
      payment,
      notes: notes.trim(),
    });
    setPlaced(order);
    setStep("receipt");
  }

  return (
    <Modal
      title={title}
      description={
        step === "receipt"
          ? "Keep this order number to claim your meal."
          : `Pickup at ${pickup} · ${lines.length} ${
              lines.length === 1 ? "item" : "items"
            }`
      }
      onClose={onClose}
    >
      {step === "details" && (
        <div className="space-y-4">
          <label className="block text-xs font-medium text-slate-400">
            Name for the order
            <input
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              placeholder="e.g. Clark C."
              className="glass-input mt-1.5 w-full rounded-lg px-3 py-2 text-sm"
              autoFocus
            />
          </label>

          <div>
            <p className="text-xs font-medium text-slate-400">Order type</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={orderType === type}
                  onClick={() => setOrderType(type)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    orderType === type
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">Payment method</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  aria-pressed={payment === method}
                  onClick={() => setPayment(method)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    payment === method
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <label className="block text-xs font-medium text-slate-400">
            Notes for the kitchen (optional)
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={2}
              placeholder="No onions, extra sauce, etc."
              className="glass-input mt-1.5 w-full resize-none rounded-lg px-3 py-2 text-sm"
            />
          </label>

          <div className="flex gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="glass-soft rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10"
            >
              Back to menu
            </button>
            <button
              type="button"
              onClick={() => setStep("review")}
              disabled={!validName}
              className="flex-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:from-amber-300 enabled:hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Customer</span>
              <span className="text-slate-200">{customer.trim()}</span>
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Pickup</span>
              <span className="text-slate-200">{pickup}</span>
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Type / Payment</span>
              <span className="text-slate-200">
                {orderType} · {payment}
              </span>
            </div>
            {notes.trim() && (
              <div className="mt-1 flex justify-between gap-4 text-xs text-slate-400">
                <span>Notes</span>
                <span className="text-right text-slate-200">{notes.trim()}</span>
              </div>
            )}
          </div>

          <ul className="space-y-2">
            {lines.map((line) => (
              <li
                key={line.key}
                className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <div>
                  <p className="text-sm text-slate-100">
                    {line.quantity}× {line.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {line.size}
                    {line.addOns.length > 0
                      ? ` · ${line.addOns.map((addOn) => addOn.label).join(", ")}`
                      : ""}
                  </p>
                </div>
                <p className="text-sm text-slate-300">
                  {formatPrice(line.unitPrice * line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
            <span className="text-slate-400">Total</span>
            <span className="text-lg font-semibold text-white">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="glass-soft rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10"
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={handlePlace}
              className="flex-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition hover:from-amber-300 hover:to-orange-400"
            >
              Place order · {formatPrice(total)}
            </button>
          </div>
          <p className="text-center text-[11px] text-slate-500">
            Mock checkout — no payment is processed.
          </p>
        </div>
      )}

      {step === "receipt" && placed && (
        <div className="space-y-4">
          <div className="flex flex-col items-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-5 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <p className="mt-3 text-sm font-semibold text-white">
              {placed.id}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Pickup at {placed.pickup} · Ready in ~
              {Math.max(
                1,
                Math.round((placed.readyAt - placed.createdAt) / 60000),
              )}{" "}
              min
            </p>
            <span className="mt-3 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300 ring-1 ring-inset ring-amber-400/30">
              {placed.status}
            </span>
          </div>

          <ul className="space-y-1.5 text-sm">
            {placed.items.map((item) => (
              <li
                key={item.name + item.options}
                className="flex justify-between gap-3 text-slate-400"
              >
                <span>
                  {item.quantity}× {item.name}
                  {item.options ? ` (${item.options})` : ""}
                </span>
                <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-sm text-slate-400">
              {placed.orderType} · {placed.payment}
            </span>
            <span className="text-base font-semibold text-white">
              {formatPrice(placed.total)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:from-amber-300 hover:to-orange-400"
          >
            Track my order
          </button>
          <p className="text-center text-[11px] text-slate-500">
            Status updates automatically. Cafeteria staff can also mark it ready
            or picked up.
          </p>
        </div>
      )}
    </Modal>
  );
}
