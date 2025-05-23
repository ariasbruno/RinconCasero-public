export type ProductData = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  applied_discount_percentage: number;
  description?: string | null;
};

export type CartItem = {
  cart_item_id: string;
  product_id: number;
  category_id: number;
  name: string;
  base_price: number;
  quantity: number;
  applied_discount_percentage: number;
};

export interface MenuItemWithDiscount {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_featured: boolean;
  is_available: boolean;
  category_id: number;
  category_name: string | null;
  category_slug: string | null;
  applied_discount_percentage: number;
}

export type OrderInfo = {
  name: string;
  address?: string;
  notes?: string;
  deliveryMethod: "delivery" | "pickup";
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
};
