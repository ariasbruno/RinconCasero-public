import type { Metadata } from "next";
import { Inter, Paytone_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import AnnouncementBar from "@/components/announcement-bar";

const inter = Inter({
  subsets: ["latin"],
  display: "block",
  preload: true,
  variable: "--font-inter",
});

const paytoneOne = Paytone_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
  variable: "--font-paytone-one",
});

export const metadata: Metadata = {
  title: "Rincón Casero | Pizzas & Empanadas en Tigre",
  description:
    "Pizzas y empanadas caseras en Tigre. Pedí online para delivery o retiro en el local. Sabores auténticos con ingredientes frescos y de calidad.",
  keywords:
    "comida casera Tigre, Rincón Casero Tigre, delivery comida Tigre, restaurante Tigre, pizzería, empanadas, Tigre, Buenos Aires, comida argentina, restaurante, delivery, pedidos online, take away",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${paytoneOne.variable} font-sans antialiased`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 bg-background" />}>
              <AnnouncementBar />
              <Navbar />
            </Suspense>
            <main className="flex-1">
              <Suspense
                fallback={<div className="min-h-screen bg-background" />}
              >
                {children}
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-16 bg-background" />}>
              <Footer />
            </Suspense>
          </div>
          <Toaster />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
