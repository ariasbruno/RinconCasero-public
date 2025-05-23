"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types/cart";

export default function CartItem({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCartStore();

  const precioFinalItem =
    item.base_price *
    (1 - item.applied_discount_percentage / 100) *
    item.quantity;

  return (
    <div className="flex flex-col border-t border-gray-200 pt-3">
      {/* Sección superior: Nombre, Precio Unitario, Botón Eliminar */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-start">
          {/* Información del producto */}
          <div>
            <p className="line-clamp-1 font-medium">{item.name}</p>
            {/* Muestra el PRECIO BASE por unidad */}
            <p className="text-sm text-muted-foreground">
              $ {item.base_price} c/u
              {/* Indicador visual si hay descuento en este item */}
              {item.applied_discount_percentage > 0 && (
                <span className="ml-1 text-xs text-green-600">
                  ({item.applied_discount_percentage}% off)
                </span>
              )}
            </p>
          </div>
        </div>
        {/* Botón para eliminar el item completo */}
        <Button
          variant="ghost"
          size="icon"
          className="-mt-1 h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => removeItem(item.cart_item_id)}
          title="Eliminar"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {/* Sección inferior: Controles de Cantidad, Precio Total del Item */}
      <div className="flex items-center justify-between">
        {/* Controles para aumentar/disminuir cantidad */}
        <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-r-none text-muted-foreground hover:bg-muted/50"
            onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-7 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-l-none text-muted-foreground hover:bg-muted/50"
            onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {/* Muestra el precio TOTAL para esta línea (cantidad * precio con descuento) */}
        <p className="font-bold">$ {precioFinalItem}</p>
      </div>
    </div>
  );
}
