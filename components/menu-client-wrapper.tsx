"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ShoppingCart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart-item";
import type { OrderInfo, CartItem as CartItemType } from "@/types/cart";
import type { CategorizedMenuData } from "@/types/menu";
import {
  useCartStore,
  selectCartSubtotal,
  selectCartTotalDiscountAmount,
  selectDozenDiscountAmount,
} from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";

const ProductCard = dynamic(() => import("@/components/product-card"), {
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
  ),
  ssr: true,
});

const CategoryNavigation = dynamic(
  () => import("@/components/category-navigation"),
  {
    loading: () => (
      <div className="mb-4 h-12 w-full animate-pulse rounded-lg bg-muted" />
    ),
    ssr: true,
  },
);

const CartSkeleton = () => (
  <div className="sticky top-24 rounded-lg bg-white p-6 shadow-md dark:bg-rincon-dark/20">
    <div className="mb-4 h-6 w-32 animate-pulse rounded bg-muted"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b pb-3">
          <div className="mb-2 flex justify-between">
            <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
            <div className="h-5 w-5 animate-pulse rounded bg-muted"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-8 w-20 animate-pulse rounded bg-muted"></div>
            <div className="h-5 w-16 animate-pulse rounded bg-muted"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function PedidoPage({
  categories,
  menuItemsByCategory,
}: CategorizedMenuData) {
  const { cartItems, totalCartPrice } = useCartStore();
  const dozenDiscount = useCartStore(selectDozenDiscountAmount);
  const subtotal = useCartStore(selectCartSubtotal);
  const totalDiscount = useCartStore(selectCartTotalDiscountAmount);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.name || "");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const handleWhatsAppOrder = () => {
    const orderInfoForWhatsApp: OrderInfo = {
      name: name || "Cliente",
      address: deliveryMethod === "delivery" ? address : undefined,
      deliveryMethod: deliveryMethod,
      subtotal: subtotal,
      totalDiscount: totalDiscount,
      finalTotal: totalCartPrice,
    };

    const whatsappUrl = generateWhatsAppOrderUrl(
      cartItems as CartItemType[],
      orderInfoForWhatsApp,
    );
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    } else {
      toast({
        title: "Error al generar enlace",
        description:
          "No se pudo crear el enlace de WhatsApp. Verifica la configuración.",
        variant: "destructive",
      });
    }
  };

  const menuItemsForCurrentTab = menuItemsByCategory[activeTab] || [];

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
            Hacé tu Pedido
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Seleccioná tus productos favoritos y realizá tu pedido online para
            delivery o take away.
          </p>
          <p className="mx-auto max-w-2xl text-base italic text-gray-700">
            *Al final del pedido se aplica el descuento a las docenas de
            empanadas
          </p>
          <div className="mx-auto mt-4 flex w-fit items-center justify-center rounded-full border-2 border-green-600 px-4 py-1 text-green-600">
            Pedido via WhatsApp
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Columna Principal (Menú) */}
          <div className="lg:col-span-3">
            {categories.length > 0 ? (
              <>
                {/* Navegación por Categorías */}
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

                {/* Grid de Productos */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {menuItemsForCurrentTab.length > 0 ? (
                    menuItemsForCurrentTab.map((item) => (
                      <Suspense
                        key={item.id}
                        fallback={
                          <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
                        }
                      >
                        <ProductCard product={item} />
                      </Suspense>
                    ))
                  ) : (
                    <p className="col-span-full py-12 text-center text-muted-foreground">
                      No hay productos disponibles en esta categoría.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No hay categorías disponibles en este momento.
              </div>
            )}
          </div>

          {/* Columna Lateral (Carrito) */}
          <div className="lg:col-span-1">
            <Suspense fallback={<CartSkeleton />}>
              <div className="sticky top-24 rounded-lg bg-white p-6 shadow-md dark:bg-rincon-dark/20">
                <h2 className="mb-4 flex items-center text-xl font-bold">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Tu Pedido
                </h2>

                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-muted-foreground">
                      Tu carrito está vacío
                    </p>
                    <p className="text-sm">
                      Agrega productos para comenzar tu pedido
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Lista Items */}
                    <div className="mb-6 max-h-[400px] space-y-4 overflow-y-auto">
                      {cartItems.map((item) => (
                        <CartItem key={item.cart_item_id} item={item} />
                      ))}
                    </div>

                    {/* Resumen Totales */}
                    <div className="mb-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <div className="mb-2 flex justify-between text-sm">

                        <span>Subtotal ({totalItems} items)</span>
                        <span className="font-semibold">$ {subtotal}</span>
                      </div>
                      {dozenDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Dto. Docena Empanadas</span>
                          <span>-$ {dozenDiscount}</span>
                        </div>
                      )}
                      {totalDiscount > 0 && (
                        <div className="mb-2 flex justify-between text-sm text-green-600">

                          <span>Total Descuentos</span>
                          <span className="font-semibold">
                            -$ {totalDiscount}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-700">

                        <span>Total:</span> <span>$ {totalCartPrice}</span>
                      </div>
                    </div>

                    {/* Formulario y Botones WhatsApp */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          className="w-full rounded-md border px-3 py-2 text-sm"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {deliveryMethod === "delivery" && (
                          <input
                            type="text"
                            placeholder="Dirección de entrega"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        )}
                        <div className="flex gap-2 text-sm">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              checked={deliveryMethod === "delivery"}
                              onChange={() => setDeliveryMethod("delivery")}
                              className="mr-1"
                            />
                            Delivery
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              checked={deliveryMethod === "pickup"}
                              onChange={() => setDeliveryMethod("pickup")}
                              className="mr-1"
                            />
                            Retiro
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          asChild
                          className="w-full bg-rincon-primary hover:bg-rincon-primary/90"
                        >
                          <Link href="/carrito">Ver carrito completo</Link>
                        </Button>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={handleWhatsAppOrder}
                          disabled={cartItems.length === 0}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Enviar por WhatsApp
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
