import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { prepareCategorizedMenuData } from "@/lib/menu_data";

const MenuClient = dynamic(() => import("./menu-client"), {
  loading: () => <div className="min-h-screen animate-pulse bg-muted" />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Menú Completo Rincón Casero | Pizzas, Empanadas",
  description:
    "Explora nuestro menú completo en Rincón Casero. Deliciosas pizzas y empanadas caseras. ¡Consulta precios y opciones!",
  keywords:
    "menú Rincón Casero, carta Rincón Casero Tigre, pizzas Tigre, empanadas Tigre, precios Rincón Casero, comida casera Tigre, Rincón Casero Tigre, delivery comida Tigre, restaurante Tigre, pizzería, empanadas, Tigre, Buenos Aires, comida argentina, restaurante, delivery, pedidos online, take away",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function MenuPage() {
  const { categories, menuItemsByCategory, error } =
    await prepareCategorizedMenuData();

  if (error || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
        {error ||
          "No se encontraron categorías o productos. El menú no puede mostrarse."}
      </div>
    );
  }
  return (
    <Suspense
      fallback={<div className="min-h-screen animate-pulse bg-muted" />}
    >
      <MenuClient
        categories={categories}
        menuItemsByCategory={menuItemsByCategory}
      />
    </Suspense>
  );
}
