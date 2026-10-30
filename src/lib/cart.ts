import type { MenuAddOn } from "@/data/mockMenu";

export const CART_KEY = "campuscafe-cart-v2";

export interface CartLine {
  key: string;
  itemId: string;
  name: string;
  size: string;
  addOns: MenuAddOn[];
  unitPrice: number;
  quantity: number;
}

export function makeLineKey(
  itemId: string,
  size: string,
  addOnIds: string[],
) {
  return `${itemId}|${size}|${[...addOnIds].sort().join(",")}`;
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(CART_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function addCartLine(lines: CartLine[], line: CartLine): CartLine[] {
  const existing = lines.find((entry) => entry.key === line.key);
  if (!existing) return [...lines, line];
  return lines.map((entry) =>
    entry.key === line.key
      ? { ...entry, quantity: entry.quantity + line.quantity }
      : entry,
  );
}

export function changeLineQuantity(
  lines: CartLine[],
  key: string,
  delta: number,
): CartLine[] {
  return lines.flatMap((line) => {
    if (line.key !== key) return [line];
    const quantity = line.quantity + delta;
    return quantity > 0 ? [{ ...line, quantity }] : [];
  });
}

export function removeCartLine(lines: CartLine[], key: string): CartLine[] {
  return lines.filter((line) => line.key !== key);
}
