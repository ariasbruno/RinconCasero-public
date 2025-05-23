import Logo from "@/public/logo.jsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestra Historia | Conocé Rincón Casero",
  description: "Descubre la historia y la pasión detrás de Rincón Casero.",
  keywords:
    "sobre Rincón Casero, historia Rincón Casero Tigre, quiénes somos Rincón Casero, comida casera Tigre, Rincón Casero Tigre, delivery comida Tigre, restaurante Tigre, pizzería, empanadas, Tigre, Buenos Aires, comida argentina, restaurante, delivery, pedidos online, take away",
  robots: {
    index: true,
    follow: true,
  },
};

export default function NosotrosPage() {
  return (
    <div className="pb-12 md:pb-20">
      <div className="container mx-auto px-0">
        {/* Sección de Introducción */}
        <div className="mb-12 bg-rincon-secondary/40 px-4 py-12 text-center">
          <h1 className="mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
            Nuestra Historia
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Conoce más sobre Rincón Casero, un lugar con tradición y pasión por
            la gastronomía argentina.
          </p>
        </div>

        {/* Historia */}
        <div className="mb-16 grid grid-cols-1 gap-8 px-4 md:max-h-min md:grid-cols-2">
          <div className="order-2 max-h-min md:order-1">
            <h2 className="mb-6 font-paytone text-3xl font-bold text-rincon-primary">
              ¡Bienvenidos a Rincón Casero!
            </h2>
            <p className="mb-4 text-lg">
              Nuestra historia comenzó en 2020, en plena pandemia, cuando
              decidimos emprender desde casa con <strong>Lo de Inés</strong>, un
              pequeño negocio familiar donde ofrecíamos milanesas, pizzas,
              empanadas y más. Gracias al apoyo de nuestros clientes, crecimos
              rápidamente y dimos el siguiente paso: abrir nuestro propio local.
            </p>
            <p className="mb-4 text-lg">
              Con el nuevo espacio, ampliamos el menú, incorporamos cafetería y
              brindamos servicio en mesa. Sin embargo, en 2021, enfrentamos
              dificultades económicas debido a una ubicación poco favorable, lo
              que nos llevó a tomar la difícil decisión de cerrar.
            </p>
            <p className="text-lg">
              Hoy, después de algunos años y con más experiencia, decidimos
              volver a nuestras raíces con <strong>Rincón Casero</strong>,
              especializándonos en lo que mejor sabemos hacer:{" "}
              <strong>pizzas y empanadas</strong>. Con la misma pasión de
              siempre, pero con una visión renovada, queremos ofrecerte sabores
              caseros, preparados con dedicación y el cariño que nos
              caracteriza.
            </p>
          </div>
          <div className="order-1 flex justify-center md:order-2 md:max-h-[500px]">
            <Logo className="object-contain md:h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
