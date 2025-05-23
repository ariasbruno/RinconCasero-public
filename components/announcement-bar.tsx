"use client";

import React, { useEffect, useState, useRef } from "react";
import { PartyPopper } from "lucide-react";

export default function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // --- Manejo de Clics Fuera ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --- Manejadores de Eventos (sin cambios) ---
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-[70] animate-fade-in bg-rincon-primary py-3 text-rincon-secondary">
      <div className="container mx-auto flex items-center justify-center px-4 text-sm md:text-base">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <PartyPopper className="h-5 w-5 animate-bounce" />
          <span className="text-center font-medium">
            <span className="font-display mr-2 uppercase">¡Gran Apertura!</span>
            <span className="inline-flex flex-wrap items-center justify-center">
              {/* Contenedor relativo: aplica hover aquí, y contiene ref */}
              <div
                ref={tooltipRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger: aplica click aquí */}
                <span
                  onClick={handleClick}
                  tabIndex={0}
                  className="mr-1 cursor-pointer rounded-sm font-bold underline decoration-dotted underline-offset-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rincon-primary"
                >
                  15% de descuento
                </span>

                {/* Tooltip */}
                {isOpen && (
                  <div
                    // *** NUEVO POSICIONAMIENTO RESPONSIVO ***
                    className="/* Estilos por defecto (móvil): anclado a bordes, sin translate */ /* A partir de sm: centrado, ancho automático, con translate */ /* Anchos máximos para pantallas mayores */ absolute left-0 right-0 top-full z-20 mt-2 max-w-xs rounded-md bg-gray-800 p-3 text-left text-xs text-white shadow-lg dark:bg-gray-900 sm:left-1/2 sm:right-auto sm:w-max sm:max-w-sm sm:-translate-x-1/2 md:max-w-md lg:max-w-lg"
                    role="tooltip"
                  >
                    El descuento del 15% no es acumulable con otras promociones
                    y no aplica a productos ya marcados como "promo".
                    {/* Flecha: Se ajusta automáticamente con left-1/2 -translate-x-1/2 */}
                    <div className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-800 dark:border-b-gray-900"></div>
                  </div>
                )}
              </div>
              {/* Fin contenedor */}

              <span className="ml-1">en todos nuestros productos</span>
            </span>
          </span>
          <PartyPopper className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
