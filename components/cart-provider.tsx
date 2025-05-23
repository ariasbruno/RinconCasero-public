"use client";

import { type ReactNode, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

export { useCartStore };
