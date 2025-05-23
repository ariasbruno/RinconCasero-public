"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@/types/menu";

export default function ProductCard({ product }: { product: MenuItem }) {
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addItem } = useCartStore();

  const { toast } = useToast();

  const cartItem = cartItems.find((item) => item.product_id === product.id);

  // --- Calcula precio y descuento para mostrar ---
  const basePrice = product.price;
  const appliedDiscount = product.applied_discount_percentage;
  let displayPrice = basePrice;
  let originalPrice = null;

  if (appliedDiscount > 0) {
    originalPrice = basePrice;
    displayPrice =
      Math.round(basePrice * (1 - appliedDiscount / 100) * 100) / 100;
  }

  // --- Manejador para añadir al carrito ---
  const handleAddToCart = () => {
    const productDataForCart: MenuItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      applied_discount_percentage: product.applied_discount_percentage,
    };

    addItem(productDataForCart, quantity);

    toast({
      title: "Agregado al carrito",
      description: `${product.name} x${quantity} agregado al carrito`,
    });

    setQuantity(1);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex h-full flex-col justify-between overflow-hidden p-6">
        <div>
          {/* Nombre y Badge "En carrito" */}
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              {cartItem && (
                <Badge variant={"cart"} className="mt-1 bg-green-600">
                  En carrito: {cartItem.quantity}
                </Badge>
              )}
            </div>
            {/* Sección de Precio (Usa displayPrice y originalPrice calculados) */}
            <div className="text-right">
              {originalPrice !== null ? (
                <>
                  <span className="dark:text-rincon-primary-light block text-nowrap text-lg font-bold text-rincon-primary">
                    $ {displayPrice}
                  </span>

                  <span className="mr-2 inline text-xs font-normal text-rincon-primary">
                    -{appliedDiscount}%
                  </span>
                  <span className="inline text-nowrap text-xs font-normal text-muted-foreground line-through">
                    $ {originalPrice}
                  </span>
                </>
              ) : (
                <span className="dark:text-rincon-primary-light block text-nowrap text-lg font-bold text-rincon-primary">
                  $ {displayPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controles y Botón Añadir */}
        <div className="mt-auto flex items-center justify-between pt-4">
          {/* Controles de Cantidad */}
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* Botón Añadir */}
          <Button
            onClick={handleAddToCart}
            className="bg-rincon-primary hover:bg-rincon-primary/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
