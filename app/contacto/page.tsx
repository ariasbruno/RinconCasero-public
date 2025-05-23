"use client";

import type React from "react";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/actions/contact-actions";
import { useToast } from "@/hooks/use-toast";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-rincon-primary text-white hover:bg-rincon-primary/90"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Enviar mensaje
        </>
      )}
    </Button>
  );
}

export default function ContactoPage() {

  const initialState: ContactFormState = null;
  const [state, formAction] = useFormState(sendContactMessage, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "success") {
      toast({
        title: "¡Mensaje Enviado!",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error al enviar",
        description: state.message || "Por favor revisa los campos.",
        variant: "destructive",
      });
    }
  }, [state, toast]);

  if (state?.status === "success") {
    return (
      <div className="py-12 dark:bg-gray-900 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="dark:text-rincon-primary-light mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
              Contacto
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Estamos aquí para responder tus preguntas
            </p>
          </div>
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <h3 className="mb-2 text-xl font-bold">¡Mensaje enviado!</h3>
            <p className="mb-6 text-muted-foreground">
              {state.message ||
                "Gracias por contactarnos. Te responderemos a la brevedad."}
            </p>
            {/* Podrías añadir un botón para volver o recargar */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 dark:bg-gray-900 dark:text-gray-100 md:py-20">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <h1 className="dark:text-rincon-primary-light mb-4 font-paytone text-4xl font-bold text-rincon-primary md:text-5xl">
            Contacto
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Estamos aquí para responder tus preguntas
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Columna Izquierda: Formulario */}
          <div>
            <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
              <h2 className="dark:text-rincon-primary-light mb-6 font-paytone text-2xl font-bold text-rincon-primary">
                Envíanos un mensaje
              </h2>

              <form action={formAction} className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Campo Nombre */}
                  <div className="space-y-1.5">
                    <Label htmlFor="nombre">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      required
                      className={
                        state?.errors?.nombre
                          ? "border-red-500"
                          : "dark:border-gray-600 dark:bg-gray-700"
                      }
                      aria-describedby={
                        state?.errors?.nombre ? "nombre-form-error" : undefined
                      }
                    />
                    {state?.errors?.nombre && (
                      <p
                        id="nombre-form-error"
                        className="text-xs text-red-600"
                      >
                        {state.errors.nombre.join(", ")}
                      </p>
                    )}
                  </div>
                  {/* Campo Apellido */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apellido">
                      Apellido <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="apellido"
                      name="apellido"
                      placeholder="Tu apellido"
                      required
                      className={
                        state?.errors?.apellido
                          ? "border-red-500"
                          : "dark:border-gray-600 dark:bg-gray-700"
                      }
                      aria-describedby={
                        state?.errors?.apellido
                          ? "apellido-form-error"
                          : undefined
                      }
                    />
                    {state?.errors?.apellido && (
                      <p
                        id="apellido-form-error"
                        className="text-xs text-red-600"
                      >
                        {state.errors.apellido.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Campo Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className={
                      state?.errors?.email
                        ? "border-red-500"
                        : "dark:border-gray-600 dark:bg-gray-700"
                    }
                    aria-describedby={
                      state?.errors?.email ? "email-form-error" : undefined
                    }
                  />
                  {state?.errors?.email && (
                    <p id="email-form-error" className="text-xs text-red-600">
                      {state.errors.email.join(", ")}
                    </p>
                  )}
                </div>

                {/* Campo Teléfono (Opcional) */}
                <div className="space-y-1.5">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+54 11 1234-5678"
                    className={
                      state?.errors?.telefono
                        ? "border-red-500"
                        : "dark:border-gray-600 dark:bg-gray-700"
                    }
                    aria-describedby={
                      state?.errors?.telefono
                        ? "telefono-form-error"
                        : undefined
                    }
                  />
                  {state?.errors?.telefono && (
                    <p
                      id="telefono-form-error"
                      className="text-xs text-red-600"
                    >
                      {state.errors.telefono.join(", ")}
                    </p>
                  )}
                </div>

                {/* Campo Mensaje */}
                <div className="space-y-1.5">
                  <Label htmlFor="mensaje">
                    Mensaje <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={5}
                    required
                    className={
                      state?.errors?.mensaje
                        ? "border-red-500"
                        : "dark:border-gray-600 dark:bg-gray-700"
                    }
                    aria-describedby={
                      state?.errors?.mensaje ? "mensaje-form-error" : undefined
                    }
                  />
                  {state?.errors?.mensaje && (
                    <p id="mensaje-form-error" className="text-xs text-red-600">
                      {state.errors.mensaje.join(", ")}
                    </p>
                  )}
                </div>

                <SubmitButton />

                {/* Mensaje de error general (si no es específico de un campo) */}
                {state?.status === "error" && !state.errors && (
                  <p className="text-sm text-red-600">{state.message}</p>
                )}
              </form>
            </div>
          </div>

          {/* Columna Derecha: Información de Contacto (sin cambios) */}
          <div>
            <div className="mb-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
              <h2 className="dark:text-rincon-primary-light mb-6 font-paytone text-2xl font-bold text-rincon-primary">
                Información de contacto
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">

                  <Phone className="mt-1 h-6 w-6 shrink-0 text-rincon-primary" />
                  <div className="ml-4">
  
                    <h3 className="text-lg font-semibold">Teléfono</h3>
                    <p>{PHONE_NUMBER}</p>
                  </div>
                </div>
                <div className="flex items-start">

                  <Mail className="mt-1 h-6 w-6 shrink-0 text-rincon-primary" />
                  <div className="ml-4">
  
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p>info@rinconcasero.com.ar</p>
                  </div>
                </div>
                <div className="flex items-start">

                  <Clock className="mt-1 h-6 w-6 shrink-0 text-rincon-primary" />
                  <div className="ml-4">
  
                    <h3 className="text-lg font-semibold">Horarios</h3>
                    <p>Jueves a Domingos: 19:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
