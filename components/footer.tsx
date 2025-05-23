"use client";

import Link from "next/link";
import Logo from "@/public/logo.jsx";
import { Facebook, Instagram, Phone, Mail, Clock } from "lucide-react";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

export default function Footer() {
  return (
    <footer className="bg-rincon-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="mb-4 flex items-center">
              <Logo className="h-12 w-auto" />
              <span className="ml-2 text-xl font-bold text-rincon-secondary">
                Rincón Casero
              </span>
            </div>
            <p className="mb-4 text-gray-300">
              Sabores auténticos de pizzas y empanadas caseras en el corazón de
              Tigre.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61575284311380"
                className="text-gray-300 hover:text-rincon-secondary"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/rinconcasero_tigre/"
                className="text-gray-300 hover:text-rincon-secondary"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          {/* Enlaces */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-rincon-secondary">
              Enlaces
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-rincon-secondary"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-300 hover:text-rincon-secondary"
                >
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-rincon-secondary"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-300 hover:text-rincon-secondary"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/pedido"
                  className="text-gray-300 hover:text-rincon-secondary"
                >
                  Pedir Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-rincon-secondary">
              Horarios
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-rincon-secondary" />
                <div>
                  <p className="font-medium">Jueves a Domingos</p>
                  <p className="text-gray-300">19:00 - 23:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-rincon-secondary">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-rincon-secondary" />
                <p>{PHONE_NUMBER}</p>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-rincon-secondary" />
                <p>info@rinconcasero.com.ar</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} Rincón Casero. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
