"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "./cart-provider";
import Logo from "@/public/logo.jsx";

const routes = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.cartItems);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-rincon-primary">
                Rincón Casero
              </span>
            </Link>
          </div>

          <nav className="hidden items-center space-x-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rincon-primary",
                  pathname === route.href
                    ? "text-rincon-primary"
                    : "text-foreground/80",
                )}
              >
                {route.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-rincon-primary hover:bg-rincon-primary/90"
            >
              <Link href="/pedido">Pedir Online</Link>
            </Button>

            <div className="relative">
              <Link href="/carrito">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rincon-primary text-xs font-medium text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </nav>

          <div className="flex md:hidden">
            <div className="relative mx-2">
              <Link href="/carrito">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rincon-primary text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  pathname === route.href
                    ? "text-rincon-primary"
                    : "text-foreground/80",
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}

            <Button
              asChild
              className="mt-4 w-full bg-rincon-primary hover:bg-rincon-primary/90"
            >
              <Link href="/pedido" onClick={() => setIsOpen(false)}>
                Pedir Online
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
