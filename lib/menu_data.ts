import { getCategories, getAllMenuItems } from "@/app/actions/menu-actions";
import type { CategorizedMenuData, MenuItem } from "@/types/menu";

export async function prepareCategorizedMenuData(): Promise<CategorizedMenuData> {
  try {
    const [menuItemsResult, categoriesResult] = await Promise.all([
      getAllMenuItems(),
      getCategories(),
    ]);

    if (!categoriesResult || categoriesResult.length === 0) {
      return {
        categories: [],
        menuItemsByCategory: {},
        error: "No se encontraron categorías. El menú no puede mostrarse.",
      };
    }

    const menuItemsByCategory: Record<string, MenuItem[]> = {};

    categoriesResult.forEach((cat) => {
      menuItemsByCategory[cat.name] = [];
    });

    (menuItemsResult || []).forEach((item) => {
      if (item.category_name) {
        if (menuItemsByCategory[item.category_name]) {
          menuItemsByCategory[item.category_name].push(item);
        } else {
          console.warn(
            `Item ${item.id} tiene category_name "${item.category_name}" que no estaba en la lista inicial de categorías. Creando dinámicamente.`,
          );
          menuItemsByCategory[item.category_name] = [item];
        }
      } else {
        console.warn(
          `Item ${item.id} (category_id: ${item.category_id}) no tiene un category_name válido o la categoría no fue encontrada.`,
        );
      }
    });

    return {
      categories: categoriesResult,
      menuItemsByCategory,
    };
  } catch (error) {
    console.error("Error al preparar los datos del menú categorizado:", error);
    return {
      categories: [],
      menuItemsByCategory: {},
      error: "Ocurrió un error al cargar el menú.",
    };
  }
}
