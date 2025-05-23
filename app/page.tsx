import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Phone, ShoppingBag } from "lucide-react";
import { getPromos } from "./actions/menu-actions";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Logo from "@/public/logo.jsx";
import { MenuItem as MenuItemType } from "@/types/menu";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

const MenuItem = dynamic(() => import("@/components/menu-item"), {
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
  ),
  ssr: true,
});

const HeroSection = () => (
  <section className="relative h-[90vh] overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero-blur.jpg"
        alt="Pizzas y empanadas caseras"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
      <h1 className="mb-4 font-paytone text-4xl font-bold md:text-6xl">
        Rincón Casero
      </h1>
      <p className="mb-2 font-paytone text-xl font-medium text-rincon-secondary md:text-2xl">
        PIZZAS & EMPANADAS
      </p>
      <p className="mb-8 max-w-2xl text-lg md:text-xl">
        Sabores auténticos con ingredientes frescos y de calidad en el corazón
        de Tigre
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="bg-rincon-primary text-white hover:bg-rincon-primary/90"
        >
          <Link href="/menu">
            Ver Menú
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-rincon-primary bg-white/90 text-rincon-primary hover:bg-white/70 hover:text-rincon-primary"
        >
          <Link href="/pedido">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Pedir Online
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="hero-pattern-dark bg-muted/50 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="mb-6 font-paytone text-3xl font-bold text-rincon-primary md:text-4xl">
            Nuestra Historia
          </h2>
          <p className="mb-4 text-lg">
            En 2020, en plena pandemia, comenzamos con Lo de Inés, un pequeño
            negocio familiar de comidas caseras. Gracias al apoyo de nuestros
            clientes, crecimos y abrimos nuestro propio local, donde ampliamos
            nuestro menú e incorporamos cafetería.
          </p>
          <p className="mb-4 text-lg">
            En 2021, enfrentamos desafíos que nos llevaron a cerrar, pero hoy
            regresamos con Rincón Casero, renovados y enfocados en lo que mejor
            sabemos hacer: pizzas y empanadas. Con la misma pasión de siempre,
            queremos ofrecerte sabores caseros, preparados con dedicación y
            cariño.
          </p>
          <Button
            asChild
            className="bg-rincon-primary hover:bg-rincon-primary/90"
          >
            <Link href="/nosotros">Conocer más</Link>
          </Button>
        </div>
        <div className="order-1 hidden md:relative md:order-2 md:block">
          <div className="relative h-[400px] overflow-hidden rounded-lg md:block">
            <Logo className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PromosSection = async () => {
  const promosItems: MenuItemType[] = await getPromos();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-paytone text-3xl font-bold text-rincon-primary md:text-4xl">
            Nuestras Promos
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {promosItems.length > 0 ? (
            promosItems.map((item) => (
              <div key={item.id} className="w-full lg:w-[45%] xl:w-[48%]">
                <MenuItem item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No hay promos disponibles.
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-rincon-primary text-white hover:bg-rincon-primary/90"
          >
            <Link href="/pedido">Arma tu pedido</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const DeliverySection = () => (
  <section className="bg-rincon-primary py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:px-16">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-6 text-balance text-center font-paytone text-3xl font-bold text-rincon-secondary md:text-4xl">
            Delivery y Take Away
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-white">
            Disfruta de nuestras deliciosas pizzas y empanadas en la comodidad
            de tu hogar o pasa a retirar tu pedido por nuestro local en Tigre.
          </p>

          <div className="center mx-auto mt-10 flex flex-col gap-4 space-y-4 text-white md:mx-0 md:w-full md:flex-row md:items-start md:justify-around md:space-y-0">
            <div className="flex items-start">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-rincon-secondary" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Horarios de Delivery</h3>
                <p>Jueves a Domingos: 19:00 - 23:00</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-rincon-secondary" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Contacto</h3>
                <p>Teléfono: {PHONE_NUMBER}</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button
              asChild
              className="bg-rincon-secondary text-rincon-primary hover:bg-rincon-secondary/90"
            >
              <Link href="/pedido">Arma tu pedido</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowToOrderSection = () => (
  <section className="bg-rincon-secondary/20 py-16">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-paytone text-3xl font-bold text-rincon-primary md:text-4xl">
          ¿Cómo hacer tu pedido?
        </h2>
        <p className="mx-auto max-w-2xl text-lg">
          Sigue estos sencillos pasos para disfrutar de nuestras delicias en la
          comodidad de tu hogar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-rincon-dark/20">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rincon-primary text-2xl font-bold text-white">
            1
          </div>
          <h3 className="mb-2 text-xl font-bold">Elige tus productos</h3>
          <p>
            Navega por nuestro menú y selecciona tus pizzas y empanadas
            favoritas.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-rincon-dark/20">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rincon-primary text-2xl font-bold text-white">
            2
          </div>
          <h3 className="mb-2 text-xl font-bold">Completa tus datos</h3>
          <p>
            Ingresa tu dirección y datos de contacto para la entrega o retiro en
            el local.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-rincon-dark/20">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rincon-primary text-2xl font-bold text-white">
            3
          </div>
          <h3 className="mb-2 text-xl font-bold">¡Disfruta!</h3>
          <p>
            Recibe tu pedido y disfruta de nuestras deliciosas pizzas y
            empanadas.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button
          asChild
          size="lg"
          className="bg-rincon-primary hover:bg-rincon-primary/90"
        >
          <Link href="/pedido">Pedir Ahora</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div className="h-[90vh] animate-pulse bg-muted" />}>
        <HeroSection />
      </Suspense>

      <Suspense>
        <AboutSection />
      </Suspense>

      <Suspense
        fallback={<div className="animate-pulse bg-muted py-16 md:py-24" />}
      >
        <PromosSection />
      </Suspense>

      <Suspense>
        <DeliverySection />
      </Suspense>

      <Suspense>
        <HowToOrderSection />
      </Suspense>
    </div>
  );
}
