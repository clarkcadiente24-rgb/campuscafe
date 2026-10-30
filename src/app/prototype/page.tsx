"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  formatPrice,
  menuCategories,
  menuItems,
  pickupSlots,
  type MenuCategory,
  type MenuItem,
  type OrderStatus,
} from "@/data/mockMenu";

const CART_KEY = "campuscafe-cart-v1";
const ORDERS_KEY = "campuscafe-orders-v1";
const PICKUP_KEY = "campuscafe-pickup-v1";

interface CartLine {
  item: MenuItem;
  quantity: number;
}

interface OrderLine {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderLine[];
  total: number;
  pickup: string;
  status: OrderStatus;
  createdAt: number;
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function readCart(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.localStorage.getItem(CART_KEY);
    return saved ? (JSON.parse(saved) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(ORDERS_KEY);
    return saved ? (JSON.parse(saved) as Order[]) : [];
  } catch {
    return [];
  }
}

function readPickup(): string {
  if (typeof window === "undefined") return pickupSlots[1];
  return window.localStorage.getItem(PICKUP_KEY) ?? pickupSlots[1];
}

function nextStatus(status: OrderStatus): OrderStatus {
  if (status === "Preparing") return "Ready";
  if (status === "Ready") return "Picked up";
  return status;
}

function orderStatusStyles(status: OrderStatus) {
  switch (status) {
    case "Preparing":
      return "bg-amber-400/10 text-amber-300 ring-amber-400/30";
    case "Ready":
      return "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30";
    case "Picked up":
      return "bg-slate-400/10 text-slate-300 ring-slate-400/30";
  }
}

const categoryStyles: Record<
  MenuCategory,
  { tile: string; badge: string }
> = {
  Coffee: {
    tile: "from-amber-500/40 to-orange-600/20",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  },
  Meals: {
    tile: "from-emerald-500/40 to-teal-600/20",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  },
  Snacks: {
    tile: "from-violet-500/40 to-fuchsia-600/20",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  },
  Drinks: {
    tile: "from-cyan-500/40 to-blue-600/20",
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  },
  Desserts: {
    tile: "from-rose-500/40 to-pink-600/20",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PrototypePage() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [cart, setCart] = useState<Record<string, number>>(readCart);
  const [orders, setOrders] = useState<Order[]>(readOrders);
  const [pickup, setPickup] = useState<string>(readPickup);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | MenuCategory>("All");

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(PICKUP_KEY, pickup);
  }, [pickup, mounted]);

  function addItem(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      const quantity = (next[id] ?? 0) - 1;
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  }

  function placeOrder() {
    const lines = menuItems
      .filter((item) => (cart[item.id] ?? 0) > 0)
      .map((item) => ({
        name: item.name,
        quantity: cart[item.id],
        price: item.price,
      }));
    if (lines.length === 0) return;

    const order: Order = {
      id: `CC-${Date.now().toString().slice(-5)}`,
      items: lines,
      total: lines.reduce(
        (sum, line) => sum + line.price * line.quantity,
        0,
      ),
      pickup,
      status: "Preparing",
      createdAt: Date.now(),
    };

    setOrders((prev) => [order, ...prev]);
    setCart({});
  }

  function advanceOrder(id: string) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: nextStatus(order.status) } : order,
      ),
    );
  }

  function resetDemo() {
    setCart({});
    setOrders([]);
    setPickup(pickupSlots[1]);
    window.localStorage.removeItem(CART_KEY);
    window.localStorage.removeItem(ORDERS_KEY);
    window.localStorage.removeItem(PICKUP_KEY);
  }

  const cartLines: CartLine[] = useMemo(
    () =>
      menuItems
        .filter((item) => (cart[item.id] ?? 0) > 0)
        .map((item) => ({ item, quantity: cart[item.id] })),
    [cart],
  );

  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.item.price * line.quantity,
    0,
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesQuery =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  if (!mounted) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            Working prototype
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Pre-order your campus meal
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Browse the cafeteria menu, build your order, choose a pickup time,
            and track it from preparation to pickup. Demo data is stored in your
            browser.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDemo}
          className="glass-soft self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          Reset demo
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <div className="glass rounded-2xl p-4">
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search meals, drinks, snacks..."
                className="glass-input w-full rounded-lg py-2.5 pl-9 pr-3 text-sm"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <CategoryChip
                label="All"
                active={category === "All"}
                onClick={() => setCategory("All")}
              />
              {menuCategories.map((item) => (
                <CategoryChip
                  key={item}
                  label={item}
                  active={category === item}
                  onClick={() => setCategory(item)}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((item) => {
              const quantity = cart[item.id] ?? 0;
              const styles = categoryStyles[item.category];
              return (
                <article
                  key={item.id}
                  className="glass flex flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div
                    className={`flex h-24 items-center justify-center rounded-xl bg-gradient-to-br ${styles.tile} ring-1 ring-inset ring-white/10`}
                  >
                    <span className="text-2xl font-semibold tracking-wide text-white/80">
                      {initials(item.name)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {item.name}
                      </h3>
                      <span className="shrink-0 text-sm font-semibold text-amber-200">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] ${styles.badge}`}
                      >
                        {item.category}
                      </span>
                      {!item.available ? (
                        <span className="text-[11px] font-medium text-slate-500">
                          Sold out
                        </span>
                      ) : quantity > 0 ? (
                        <QuantityControl
                          quantity={quantity}
                          onAdd={() => addItem(item.id)}
                          onRemove={() => removeItem(item.id)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => addItem(item.id)}
                          className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition hover:from-amber-300 hover:to-orange-400"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center text-sm text-slate-400">
              No menu items match your search.
            </div>
          )}
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Your order</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            {cartLines.length === 0 ? (
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-slate-400">
                Your cart is empty. Add something from the menu to get started.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {cartLines.map((line) => (
                  <li
                    key={line.item.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-100">
                        {line.item.name}
                      </p>
                      <p className="text-sm text-slate-300">
                        {formatPrice(line.item.price * line.quantity)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityControl
                        quantity={line.quantity}
                        onAdd={() => addItem(line.item.id)}
                        onRemove={() => removeItem(line.item.id)}
                      />
                      <span className="text-xs text-slate-500">
                        {formatPrice(line.item.price)} each
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
              <label className="block text-xs font-medium text-slate-400">
                Pickup time
                <select
                  value={pickup}
                  onChange={(event) => setPickup(event.target.value)}
                  className="glass-input mt-1.5 w-full rounded-lg px-3 py-2 text-sm"
                >
                  {pickupSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={placeOrder}
                disabled={cartLines.length === 0}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition enabled:hover:from-amber-300 enabled:hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Place order
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Mock checkout — no payment is processed.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your orders</h2>
          <span className="text-xs text-slate-500">
            Track status from preparing to pickup
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-sm text-slate-400">
            No orders yet. Place an order to see it tracked here.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order.id} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {order.id}
                    </p>
                    <p className="text-xs text-slate-500">
                      Pickup at {order.pickup}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${orderStatusStyles(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-400">
                  {order.items.map((line) => (
                    <li
                      key={line.name}
                      className="flex justify-between gap-2"
                    >
                      <span>
                        {line.quantity}× {line.name}
                      </span>
                      <span>{formatPrice(line.price * line.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-sm font-semibold text-white">
                    {formatPrice(order.total)}
                  </span>
                  {order.status !== "Picked up" ? (
                    <button
                      type="button"
                      onClick={() => advanceOrder(order.id)}
                      className="glass-soft rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                    >
                      {order.status === "Preparing"
                        ? "Mark ready"
                        : "Mark picked up"}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500">Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
        active
          ? "bg-white/10 text-white ring-1 ring-inset ring-white/20"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function QuantityControl({
  quantity,
  onAdd,
  onRemove,
}: {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove one"
        className="flex h-6 w-6 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        −
      </button>
      <span className="w-4 text-center text-xs font-semibold text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onAdd}
        aria-label="Add one"
        className="flex h-6 w-6 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        +
      </button>
    </div>
  );
}
