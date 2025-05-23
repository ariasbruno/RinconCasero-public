import React from "react";
import MenuClientWrapper from "@/components/menu-client-wrapper";
import { prepareCategorizedMenuData } from "@/lib/menu_data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haz tu Pedido Online en Rincón Casero Tigre | Delivery o Retiro",
  description:
    "Arma tu pedido fácilmente de tu comida favorita de Rincón Casero. Selecciona del menú y programa tu delivery o retiro. ¡Rápido y delicioso!",
  keywords:
    "pedir comida Rincón Casero Tigre, delivery online Tigre, Rincón Casero pedido online, comida casera Tigre, Rincón Casero Tigre, delivery comida Tigre, restaurante Tigre, pizzería, empanadas, Tigre, Buenos Aires, comida argentina, restaurante, delivery, pedidos online, take away",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PedidoPageServer() {
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
    <MenuClientWrapper
      categories={categories}
      menuItemsByCategory={menuItemsByCategory}
    />
  );
}
