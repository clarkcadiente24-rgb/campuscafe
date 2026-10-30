"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import CheckoutSheet from "@/components/CheckoutSheet";
import MenuItemModal from "@/components/MenuItemModal";
import ToastStack from "@/components/ToastStack";
import {
  formatPrice,
  menuCategories,
  menuItems,
  pickupSlots,
  type MenuCategory,
  type MenuItem,
} from "@/data/mockMenu";
import { isItemAvailable, resetAvailability, useAvailability } from "@/lib/availability";
import {
  addCartLine,
  cartCount,
  cartTotal,
  CART_KEY,
  changeLineQuantity,
  makeLineKey,
  readCart,
  removeCartLine,
  type CartLine,
} from "@/lib/cart";
import {
  autoReadyOrders,
  clearOrders,
  createOrder,
  formatCountdown,
  orderStatuses,
  statusStyles,
  useOrders,
  type OrderStatus,
  type OrderType,
  type PaymentMethod,
} from "@/lib/orders";
import { useToasts } from "@/lib/useToasts";

const PICKUP_KEY = "campuscafe-pickup-v1";

const categoryStyles: Record<MenuCategory, { tile: string; badge: string }> = {
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

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function readPickup(): string {
  if (typeof window === "undefined") return pickupSlots[1];
  return window.localStorage.getItem(PICKUP_KEY) ?? pickupSlots[1];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function defaultLine(item: MenuItem): CartLine {
  const size = item.sizes?.[0] ?? { label: "Regular", priceDelta: 0 };
  return {
    key: makeLineKey(item.id, size.label, []),
    itemId: item.id,
    name: item.name,
    size: size.label,
    addOns: [],
    unitPrice: item.price + size.priceDelta,
    quantity: 1,
  };
}

export default function PrototypePage() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [cart, setCart] = useState<CartLine[]>(readCart);
  const [pickup, setPickup] = useState<string>(readPickup);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | MenuCategory>("All");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [now, setNow] = useState(0);
  const orders = useOrders();
  const availability = useAvailability();
  const { toasts, push, dismiss } = useToasts();

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(PICKUP_KEY, pickup);
  }, [pickup, mounted]);

  useEffect(() => {
    if (!mounted) return;
    function tick() {
      const timestamp = Date.now();
      setNow(timestamp);
      const ready = autoReadyOrders(timestamp);
      ready.forEach((id) => {
        push({
          title: `Order ${id} is ready`,
          message: "Head to the pickup counter to claim your meal.",
          tone: "success",
        });
      });
    }
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [mounted, push]);

  const itemCount = cartCount(cart);
  const total = cartTotal(cart);
  const maxPrep = cart.reduce((max, line) => {
    const item = menuItems.find((entry) => entry.id === line.itemId);
    return Math.max(max, item?.prepMinutes ?? 0);
  }, 0);

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

  function handleAddLine(line: CartLine) {
    setCart((prev) => addCartLine(prev, line));
  }

  function placeOrder(details: {
    customer: string;
    orderType: OrderType;
    payment: PaymentMethod;
    notes: string;
  }) {
    const order = createOrder({
      ...details,
      pickup,
      items: cart.map((line) => ({
        name: line.name,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        options: [line.size, ...line.addOns.map((addOn) => addOn.label)].join(
          ", ",
        ),
      })),
      total,
      prepMinutes: maxPrep + 1,
    });
    setCart([]);
    push({
      title: "Order placed",
      message: `${order.id} is being prepared for ${order.pickup}.`,
      tone: "success",
    });
    return order;
  }

  function resetDemo() {
    setCart([]);
    setPickup(pickupSlots[1]);
    clearOrders();
    resetAvailability();
    window.localStorage.removeItem(CART_KEY);
    window.localStorage.removeItem(PICKUP_KEY);
    push({
      title: "Demo reset",
      message: "Cart, orders, and menu availability were cleared.",
      tone: "info",
    });
  }

  if (!mounted) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            Working prototype
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Pre-order your campus meal
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Browse the menu, customize an item, choose a pickup time, and track
            your order from preparation to pickup. Demo data is stored in your
            browser.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/staff"
            className="glass-soft rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Staff board
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
              const available = isItemAvailable(
                availability,
                item.id,
                item.available,
              );
              const defaultSize = item.sizes?.[0] ?? {
                label: "Regular",
                priceDelta: 0,
              };
              const quickKey = makeLineKey(item.id, defaultSize.label, []);
              const quickQty =
                cart.find((line) => line.key === quickKey)?.quantity ?? 0;
              const styles = categoryStyles[item.category];

              return (
                <article
                  key={item.id}
                  className={`glass flex flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 ${
                    available ? "" : "opacity-80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="group block w-full text-left"
                  >
                    <div
                      className={`relative flex h-24 items-center justify-center rounded-xl bg-gradient-to-br ${styles.tile} ring-1 ring-inset ring-white/10`}
                    >
                      <span className="text-2xl font-semibold tracking-wide text-white/80">
                        {initials(item.name)}
                      </span>
                      {item.featured && available && (
                        <span className="absolute left-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-amber-200 backdrop-blur">
                          Best seller
                        </span>
                      )}
                      {!available && (
                        <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/55 text-xs font-semibold uppercase tracking-wide text-slate-200">
                          Sold out
                        </span>
                      )}
                      <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-black/40 px-1.5 py-0.5 text-[10px] text-amber-200 backdrop-blur">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-2.5 w-2.5"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10 1.8l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L10 1.8z" />
                        </svg>
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">
                          {item.name}
                        </h3>
                        <span className="shrink-0 text-sm font-semibold text-amber-200">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                      <p className="mt-1.5 text-[11px] text-slate-500">
                        Ready in ~{item.prepMinutes} min · {item.reviews} reviews
                      </p>
                    </div>
                  </button>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] ${styles.badge}`}
                    >
                      {item.category}
                    </span>
                    {!available ? (
                      <span className="text-[11px] font-medium text-slate-500">
                        Unavailable
                      </span>
                    ) : quickQty > 0 ? (
                      <QuantityControl
                        quantity={quickQty}
                        onAdd={() =>
                          setCart((prev) =>
                            addCartLine(prev, defaultLine(item)),
                          )
                        }
                        onRemove={() =>
                          setCart((prev) =>
                            changeLineQuantity(prev, quickKey, -1),
                          )
                        }
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setCart((prev) => addCartLine(prev, defaultLine(item)))
                        }
                        className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition hover:from-amber-300 hover:to-orange-400"
                      >
                        Add
                      </button>
                    )}
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
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="text-xs text-slate-500 transition hover:text-rose-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {cart.length === 0 ? (
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-slate-400">
                Your cart is empty. Add something from the menu to get started.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {cart.map((line) => (
                  <li
                    key={line.key}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          {line.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {line.size}
                          {line.addOns.length > 0
                            ? ` · ${line.addOns
                                .map((addOn) => addOn.label)
                                .join(", ")}`
                            : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCart((prev) => removeCartLine(prev, line.key))
                        }
                        aria-label={`Remove ${line.name}`}
                        className="text-slate-500 transition hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityControl
                        quantity={line.quantity}
                        onAdd={() =>
                          setCart((prev) =>
                            changeLineQuantity(prev, line.key, 1),
                          )
                        }
                        onRemove={() =>
                          setCart((prev) =>
                            changeLineQuantity(prev, line.key, -1),
                          )
                        }
                      />
                      <span className="text-sm text-slate-300">
                        {formatPrice(line.unitPrice * line.quantity)}
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

              {cart.length > 0 && (
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Estimated prep</span>
                  <span>~{maxPrep + 1} min</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total</span>
                <span className="font-semibold text-white">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                disabled={cart.length === 0}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition enabled:hover:from-amber-300 enabled:hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Mock checkout — no payment is processed.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-white">Live orders</h2>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>Status updates automatically</span>
            <Link
              href="/staff"
              className="text-amber-300 transition hover:text-amber-200"
            >
              Open staff board
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-sm text-slate-400">
            No orders yet. Place an order to see it tracked here.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => {
              const remaining = order.readyAt - (now || order.createdAt);
              return (
                <div key={order.id} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {order.id}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.customer} · Pickup {order.pickup}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <OrderTracker status={order.status} />

                  <ul className="mt-3 space-y-1 text-sm text-slate-400">
                    {order.items.map((line) => (
                      <li
                        key={line.name + line.options}
                        className="flex justify-between gap-2"
                      >
                        <span>
                          {line.quantity}× {line.name}
                          {line.options ? (
                            <span className="block text-[11px] text-slate-500">
                              {line.options}
                            </span>
                          ) : null}
                        </span>
                        <span>{formatPrice(line.unitPrice * line.quantity)}</span>
                      </li>
                    ))}
                  </ul>

                  {order.notes && (
                    <p className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-slate-400">
                      Note: {order.notes}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.orderType} · {order.payment}
                      </p>
                    </div>
                    {order.status === "Preparing" ? (
                      <span className="text-xs font-medium text-amber-300">
                        {remaining > 0
                          ? `Ready in ${formatCountdown(remaining)}`
                          : "Finishing up"}
                      </span>
                    ) : order.status === "Ready" ? (
                      <span className="text-xs font-medium text-emerald-300">
                        Ready for pickup
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {activeItem && (
        <MenuItemModal
          item={activeItem}
          available={isItemAvailable(
            availability,
            activeItem.id,
            activeItem.available,
          )}
          onAdd={handleAddLine}
          onClose={() => setActiveItem(null)}
        />
      )}

      {checkoutOpen && (
        <CheckoutSheet
          lines={cart}
          pickup={pickup}
          onPlace={placeOrder}
          onClose={() => setCheckoutOpen(false)}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismiss} />
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

function OrderTracker({ status }: { status: OrderStatus }) {
  const activeIndex = orderStatuses.indexOf(status);
  return (
    <div className="mt-3">
      <div className="flex gap-1">
        {orderStatuses.map((entry, index) => (
          <span
            key={entry}
            className={`h-1 flex-1 rounded-full ${
              index <= activeIndex ? "bg-emerald-400/80" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        {orderStatuses.map((entry) => (
          <span key={entry}>{entry}</span>
        ))}
      </div>
    </div>
  );
}
