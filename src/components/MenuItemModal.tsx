"use client";

import { useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { formatPrice, type MenuItem } from "@/data/mockMenu";
import { makeLineKey, type CartLine } from "@/lib/cart";

export default function MenuItemModal({
  item,
  available,
  onAdd,
  onClose,
}: {
  item: MenuItem;
  available: boolean;
  onAdd: (line: CartLine) => void;
  onClose: () => void;
}) {
  const sizes = useMemo(
    () => item.sizes ?? [{ label: "Regular", priceDelta: 0 }],
    [item.sizes],
  );
  const [size, setSize] = useState(sizes[0].label);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const selectedSize = sizes.find((entry) => entry.label === size) ?? sizes[0];
  const selectedAddOns = (item.addOns ?? []).filter((addOn) =>
    addOnIds.includes(addOn.id),
  );
  const unitPrice =
    item.price +
    selectedSize.priceDelta +
    selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);

  function toggleAddOn(id: string) {
    setAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  }

  function handleAdd() {
    if (!available) return;
    onAdd({
      key: makeLineKey(item.id, size, addOnIds),
      itemId: item.id,
      name: item.name,
      size,
      addOns: selectedAddOns,
      unitPrice,
      quantity,
    });
    onClose();
  }

  return (
    <Modal
      title={item.name}
      description={item.description}
      onClose={onClose}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1 text-amber-300">
          <svg
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 1.8l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L10 1.8z" />
          </svg>
          {item.rating.toFixed(1)}
        </span>
        <span>{item.reviews} reviews</span>
        <span>·</span>
        <span>Ready in ~{item.prepMinutes} min</span>
        <span>·</span>
        <span className="text-slate-300">{formatPrice(item.price)} base</span>
        {item.featured && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] text-amber-200">
            Best seller
          </span>
        )}
      </div>

      {item.sizes && (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Size
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.sizes.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setSize(option.label)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  size === option.label
                    ? "border-amber-400/40 bg-amber-400/15 text-amber-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {option.label}
                {option.priceDelta > 0
                  ? ` +${formatPrice(option.priceDelta)}`
                  : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {item.addOns && item.addOns.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Add-ons
          </p>
          <div className="mt-2 space-y-1.5">
            {item.addOns.map((addOn) => {
              const selected = addOnIds.includes(addOn.id);
              return (
                <button
                  key={addOn.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-xs transition ${
                    selected
                      ? "border-amber-400/40 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selected
                          ? "border-amber-300 bg-amber-300 text-slate-900"
                          : "border-white/20"
                      }`}
                    >
                      {selected && (
                        <svg
                          viewBox="0 0 20 20"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          aria-hidden="true"
                        >
                          <path d="m5 10 3.5 3.5L15 7" />
                        </svg>
                      )}
                    </span>
                    {addOn.label}
                  </span>
                  <span>
                    {addOn.price > 0
                      ? `+${formatPrice(addOn.price)}`
                      : "Free"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            −
          </button>
          <span className="w-5 text-center text-sm font-semibold text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!available}
          className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition enabled:hover:from-amber-300 enabled:hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {available
            ? `Add ${quantity} · ${formatPrice(unitPrice * quantity)}`
            : "Sold out"}
        </button>
      </div>
    </Modal>
  );
}
