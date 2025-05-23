import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductData, CartItem } from "@/types/cart";

const EMPANADA_CATEGORY_ID = 2;
const ITEMS_PER_DOZEN = 12;
const FREE_ITEMS_PER_DOZEN = 2;

export type CartStore = {
  cartItems: CartItem[];
  totalCartPrice: number;
  addItem: (productData: ProductData, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

// --- HELPER INTERNO ---

const calculateTotal = (items: CartItem[]): number => {
  const totalBeforeDozenDiscount = items.reduce((acc, item) => {
    const priceAfterDiscount =
      item.base_price * (1 - item.applied_discount_percentage / 100);
    const itemTotal = priceAfterDiscount * item.quantity;
    return acc + itemTotal;
  }, 0);

  const empanadaItems = items.filter(
    (item) => item.category_id === EMPANADA_CATEGORY_ID,
  );
  let dozenDiscountValue = 0;

  if (empanadaItems.length > 0) {
    const totalEmpanadaQuantity = empanadaItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const numberOfDozens = Math.floor(totalEmpanadaQuantity / ITEMS_PER_DOZEN);

    if (numberOfDozens > 0) {
      const numberOfFreeEmpanadas = numberOfDozens * FREE_ITEMS_PER_DOZEN;

      const cheapestEmpanadaPrice = Math.min(
        ...empanadaItems.map(
          (item) =>
            item.base_price * (1 - item.applied_discount_percentage / 100),
        ),
      );

      dozenDiscountValue = numberOfFreeEmpanadas * cheapestEmpanadaPrice;
    }
  }

  const finalTotal = totalBeforeDozenDiscount - dozenDiscountValue;

  return Math.round(Math.max(0, finalTotal) * 100) / 100;
};

// --- SELECTORES (Para usar en la UI) ---

export const selectCartSubtotal = (state: CartStore): number => {
  const subtotal = state.cartItems.reduce((acc, item) => {
    const itemSubtotal = item.base_price * item.quantity;
    return acc + itemSubtotal;
  }, 0);
  return Math.round(subtotal * 100) / 100;
};

export const selectCartTotalDiscountAmount = (state: CartStore): number => {
  const subtotal = selectCartSubtotal(state);
  const finalTotal = state.totalCartPrice;
  const discount = Math.max(0, subtotal - finalTotal);
  return Math.round(discount * 100) / 100;
};

export const selectDozenDiscountAmount = (state: CartStore): number => {
  const empanadaItems = state.cartItems.filter(
    (item) => item.category_id === EMPANADA_CATEGORY_ID,
  );
  let dozenDiscountValue = 0;

  if (empanadaItems.length > 0) {
    const totalEmpanadaQuantity = empanadaItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const numberOfDozens = Math.floor(totalEmpanadaQuantity / ITEMS_PER_DOZEN);

    if (numberOfDozens > 0) {
      const numberOfFreeEmpanadas = numberOfDozens * FREE_ITEMS_PER_DOZEN;
      const cheapestEmpanadaPrice = Math.min(
        ...empanadaItems.map(
          (item) =>
            item.base_price * (1 - item.applied_discount_percentage / 100),
        ),
      );
      dozenDiscountValue = numberOfFreeEmpanadas * cheapestEmpanadaPrice;
    }
  }
  return Math.round(dozenDiscountValue * 100) / 100;
};

// --- STORE PRINCIPAL ---

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      totalCartPrice: 0,

      addItem: (productData, quantityToAdd) =>
        set((state) => {
          const {
            id: productIdNum,
            category_id: categoryId,
            price: basePrice,
            name,
            applied_discount_percentage: appliedDiscountPercentage,
          } = productData;

          const cartItemId = productIdNum.toString();
          const existingItem = state.cartItems.find(
            (i) => i.cart_item_id === cartItemId,
          );
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.cartItems.map((i) =>
              i.cart_item_id === cartItemId
                ? { ...i, quantity: i.quantity + quantityToAdd }
                : i,
            );
          } else {
            const newItem: CartItem = {
              cart_item_id: cartItemId,
              product_id: productIdNum,
              category_id: categoryId,
              name: name,
              base_price: basePrice,
              quantity: quantityToAdd,
              applied_discount_percentage: appliedDiscountPercentage,
            };
            newItems = [...state.cartItems, newItem];
          }

          const newTotal = calculateTotal(newItems);

          return { cartItems: newItems, totalCartPrice: newTotal };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const newItems = state.cartItems.filter(
            (i) => i.cart_item_id !== itemId,
          );
          const newTotal = calculateTotal(newItems);
          return { cartItems: newItems, totalCartPrice: newTotal };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          let newItems: CartItem[];
          if (quantity <= 0) {
            newItems = state.cartItems.filter((i) => i.cart_item_id !== itemId);
          } else {
            newItems = state.cartItems.map((item) =>
              item.cart_item_id === itemId ? { ...item, quantity } : item,
            );
          }
          const newTotal = calculateTotal(newItems);
          return { cartItems: newItems, totalCartPrice: newTotal };
        }),

      clearCart: () => set({ cartItems: [], totalCartPrice: 0 }),
    }),
    {
      name: "cart-storage",
      // skipHydration: true,
    },
  ),
);
