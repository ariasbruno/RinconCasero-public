export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  applied_discount_percentage: number;
};

export type ItemsForWpp = {
  name: string;
  price: number;
  quantity: number;
};

export type CategorizedMenuData = {
  categories: Category[];
  menuItemsByCategory: Record<string, MenuItem[]>;
  error?: string;
};
