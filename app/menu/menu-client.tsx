"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ShoppingBag } from "lucide-react";
import type { Category, MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import CategoryNavigation from "@/components/category-navigation";

const MenuSection = dynamic(() => import("@/components/menu-section"), {
  loading: () => (
    <div className="mb-8 h-40 animate-pulse rounded-lg bg-muted/50" />
  ),
  ssr: false,
});

interface MenuClientProps {
  categories: Category[];
  menuItemsByCategory: Record<string, MenuItem[]>;
}

export default function MenuClient({
  categories,
  menuItemsByCategory,
}: MenuClientProps) {
  if (!categories.find((cat) => cat.name === "Todos")) {
    categories.unshift({
      id: 0,
      name: "Todos",
      slug: "todos",
      description: "Todos los productos",
    });
  }
  const [activeTab, setActiveTab] = useState<string>(
    categories[0]?.name || "Todos",
  );

  return (
    <div className="py-12 dark:bg-gray-900 dark:text-gray-100 md:py-20">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <h1 className="dark:text-rincon-primary-light mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
            Nuestro Menú
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Descubre nuestras deliciosas pizzas y empanadas artesanales,
            elaboradas con ingredientes frescos y de calidad.
          </p>
          <Button
            asChild
            className="mt-6 bg-rincon-primary text-white hover:bg-rincon-primary/90"
          >
            <Link href="/pedido">
              {" "}
              <ShoppingBag className="mr-2 h-4 w-4" /> Pedir Online{" "}
            </Link>
          </Button>
        </div>

        {/* Navegación por Categorías */}
        {categories.length > 0 && (
          <Suspense
            fallback={
              <div className="mb-4 h-12 w-full animate-pulse rounded-lg bg-muted" />
            }
          >
            <CategoryNavigation
              categories={categories.map((category) => category.name)}
              activeCategory={activeTab}
              onSelectCategory={setActiveTab}
            />
          </Suspense>
        )}

        {/* Contenido del Menú */}
        <div>
          {activeTab === "Todos"
            ? categories
                .filter((cat) => cat.name !== "Todos")
                .map((category) => {
                  const itemsForSection =
                    menuItemsByCategory[category.name] || [];

                  if (itemsForSection.length > 0) {
                    return (
                      <Suspense
                        key={category.id || category.name}
                        fallback={
                          <div className="mb-8 h-40 animate-pulse rounded-lg bg-muted/50" />
                        }
                      >
                        <MenuSection
                          title={category.name}
                          items={itemsForSection}
                        />
                      </Suspense>
                    );
                  }
                  return null;
                })
            : (() => {
                const itemsForSelectedTab =
                  menuItemsByCategory[activeTab] || [];
                if (itemsForSelectedTab.length > 0) {
                  return (
                    <Suspense
                      fallback={
                        <div className="mb-8 h-40 animate-pulse rounded-lg bg-muted/50" />
                      }
                    >
                      <MenuSection
                        title={activeTab}
                        items={itemsForSelectedTab}
                      />
                    </Suspense>
                  );
                } else {
                  return (
                    <p className="py-12 text-center text-muted-foreground">
                      No hay productos disponibles en esta categoría.
                    </p>
                  );
                }
              })()}
        </div>
      </div>
    </div>
  );
}
