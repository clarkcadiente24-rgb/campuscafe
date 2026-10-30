"use client";

import { useSyncExternalStore } from "react";

type Overrides = Record<string, boolean>;

const STORAGE_KEY = "campuscafe-availability-v1";
const EVENT = "campuscafe:availability-changed";
const EMPTY: Overrides = {};

let cachedRaw: string | null = null;
let cached: Overrides = EMPTY;

function readOverrides(): Overrides {
  if (typeof window === "undefined") return EMPTY;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY;
    const parsed = JSON.parse(saved) as Overrides;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return EMPTY;
    }
    return parsed;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Overrides {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = readOverrides();
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

function commit(overrides: Overrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  cachedRaw = null;
  window.dispatchEvent(new Event(EVENT));
}

export function useAvailability() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function setItemAvailability(id: string, available: boolean) {
  commit({ ...getSnapshot(), [id]: available });
}

export function resetAvailability() {
  commit({});
}

export function isItemAvailable(
  overrides: Overrides,
  id: string,
  fallback: boolean,
) {
  return overrides[id] ?? fallback;
}
