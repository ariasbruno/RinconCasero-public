import type { CartItem, OrderInfo } from "@/types/cart";

export function generateWhatsAppOrderUrl(
  cartItems: CartItem[],
  orderInfo: OrderInfo,
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!phoneNumber) {
    return "";
  }

  let message = `*Nuevo Pedido de ${orderInfo.name}*\n\n`;

  message += `*Método:* ${orderInfo.deliveryMethod === "delivery" ? "Delivery" : "Retiro en local"}\n`;

  if (orderInfo.deliveryMethod === "delivery") {
    if (orderInfo.address) {
      message += `*Dirección:* ${orderInfo.address}\n`;
    }
  }

  message += "\n*Productos:*\n";

  cartItems.forEach((item) => {
    const pricePerUnitAfterDiscount =
      item.base_price * (1 - item.applied_discount_percentage / 100);
    const lineTotal = pricePerUnitAfterDiscount * item.quantity;

    message += `• ${item.name} x${item.quantity}`;

    if (item.applied_discount_percentage > 0) {
      message += ` ($${pricePerUnitAfterDiscount} c/u - ${item.applied_discount_percentage}% off)`;
    } else {
      message += ` ($${item.base_price} c/u)`;
    }
    message += ` - *$${lineTotal}*\n`;
  });

  // --- Resumen de Totales ---
  message += "\n*Resumen:*\n";
  message += `Subtotal: $${orderInfo.subtotal}\n`;

  if (orderInfo.totalDiscount > 0) {
    message += `Descuentos: -$${orderInfo.totalDiscount}\n`;
  }

  message += `*Total Final:* *$${orderInfo.finalTotal}*\n`;

  if (orderInfo.notes) {
    message += `\n*Notas Adicionales:*\n${orderInfo.notes}\n`;
  }

  message += "\n¡Gracias por tu pedido!";

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
