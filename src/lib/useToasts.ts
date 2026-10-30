"use client";

import { useCallback, useRef, useState } from "react";

export interface Toast {
  id: number;
  title: string;
  message?: string;
  tone?: "success" | "info" | "error";
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback((toast: Omit<Toast, "id">) => {
    counter.current += 1;
    const id = counter.current;
    setToasts((prev) => [...prev, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((entry) => entry.id !== id));
    }, 4500);
  }, []);

  return { toasts, push, dismiss };
}
