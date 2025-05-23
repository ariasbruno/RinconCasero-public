"use server";

import { createClient } from "@/lib/supabase/server";
import type { Category, MenuItem } from "@/types/menu";
import { cache } from "react";

export const getAllMenuItems = cache(async (): Promise<MenuItem[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items_with_active_discount")
    .select(
      "id, name, description, price, category_id, category_name, category_slug, applied_discount_percentage",
    )
    .eq("is_available", true)
    .order("name");

  if (error) {
    console.error(
      "Error fetching from menu_items_with_active_discount view:",
      error,
    );
    return [];
  }

  return (data as MenuItem[]) || [];
});

export const getCategories = cache(async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
});

export const getPromos = cache(async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items_with_active_discount")
    .select(
      `id, name, description, price, category_id, category_name, category_slug, applied_discount_percentage`,
    )
    .eq("is_available", true)
    .eq("category_id", "4")
    .order("name");

  if (error) {
    console.error("Error fetching promos:", error);
    return [];
  }

  return data;
});
