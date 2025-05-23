"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CartItem from "@/components/cart-item";
import {
  useCartStore,
  selectCartSubtotal,
  selectCartTotalDiscountAmount,
  selectDozenDiscountAmount,
} from "@/store/cartStore";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import type { CartItem as CartItemType } from "@/types/cart";

export default function CarritoPage() {
  const { cartItems, clearCart, totalCartPrice } = useCartStore();
  const dozenDiscount = useCartStore(selectDozenDiscountAmount);
  const subtotal = useCartStore(selectCartSubtotal);
  const totalDiscount = useCartStore(selectCartTotalDiscountAmount);

  const { toast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleWhatsAppOrder = () => {
    setNameError(null);
    setAddressError(null);

    let isValid = true;
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos a tu carrito para continuar",
        variant: "destructive",
      });
      isValid = false;
    }

    if (!name.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa tu nombre para continuar",
        variant: "destructive",
      });
      setNameError("El nombre es requerido.");
      isValid = false;
    }

    if (deliveryMethod === "delivery" && !address.trim()) {
      toast({
        title: "Dirección requerida",
        description: "Por favor ingresa tu dirección para la entrega",
        variant: "destructive",
      });
      setAddressError("La dirección es requerida para delivery.");
      isValid = false;
    }

    if (!isValid) {
      toast({
        title: "Error en el formulario",
        description: "Por favor corrige los campos marcados.",
        variant: "destructive",
      });
      return;
    }

    const whatsappUrl = generateWhatsAppOrderUrl(cartItems as CartItemType[], {
      name,
      address: deliveryMethod === "delivery" ? address : undefined,
      notes: notes || undefined,
      deliveryMethod,
      subtotal: subtotal,
      totalDiscount: totalDiscount,
      finalTotal: totalCartPrice,
    });
    window.open(whatsappUrl, "_blank");
  };

  // --- Manejadores de Cambio con Limpieza de Error ---
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError && e.target.value.trim()) {
      setNameError(null);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (addressError && e.target.value.trim()) {
      setAddressError(null);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {/* Encabezado */}
          <h1 className="mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
            Tu Carrito
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Revisa tu pedido y completa tus datos para finalizar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Columna Izquierda/Principal: Items y Formularios */}
          <div className="space-y-8 lg:col-span-2">
            {/* Sección Productos */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">Productos</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => clearCart()}
                  disabled={cartItems.length === 0}
                >
                  Vaciar carrito
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-muted-foreground">
                    Tu carrito está vacío
                  </p>
                  <Button
                    asChild
                    className="bg-rincon-primary hover:bg-rincon-primary/90"
                  >
                    <Link href="/pedido">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver al menú
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <CartItem key={item.cart_item_id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Sección Método de Entrega */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-rincon-dark/20">
              <h2 className="mb-6 text-xl font-bold">Método de entrega</h2>

              <RadioGroup
                defaultValue="delivery"
                className="mb-6"
                onValueChange={(value) =>
                  setDeliveryMethod(value as "delivery" | "pickup")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery a domicilio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Retiro en el local</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Sección Datos de Contacto */}
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-rincon-dark/20">
              <h2 className="mb-6 text-xl font-bold">Datos de contacto</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className={`dark:border-gray-600 dark:bg-gray-700 ${nameError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? "nombre-error" : undefined}
                  />
                  {nameError && (
                    <p id="nombre-error" className="text-xs text-red-600">
                      {nameError}
                    </p>
                  )}
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      placeholder="Calle, número, piso, depto"
                      value={address}
                      onChange={handleAddressChange}
                      required={deliveryMethod === "delivery"}
                      className={`dark:border-gray-600 dark:bg-gray-700 ${addressError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      aria-invalid={!!addressError}
                      aria-describedby={
                        addressError ? "direccion-error" : undefined
                      }
                    />
                    {addressError && (
                      <p id="direccion-error" className="text-xs text-red-600">
                        {addressError}
                      </p>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="notas">Notas adicionales</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    placeholder="Instrucciones especiales, alergias, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-rincon-dark/20">
              <h2 className="mb-4 text-xl font-bold">Resumen del pedido</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>$ {subtotal}</span>
                </div>
                {dozenDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">

                    <span>Dto. Docena Empanadas</span>
                    <span>-$ {dozenDiscount}</span>
                  </div>
                )}
                {totalDiscount > 0 && totalDiscount !== dozenDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Total Descuentos</span>
                    <span className="font-semibold">-$ {totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Total</span>
                  <span>$ {totalCartPrice}</span>
                </div>
              </div>

              <Button
                className="mt-6 w-full bg-green-600 hover:bg-green-600/90"
                onClick={handleWhatsAppOrder}
                disabled={cartItems.length === 0}
              >
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar pedido por WhatsApp
                </>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
