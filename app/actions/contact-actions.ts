"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  apellido: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  telefono: z.string().optional().or(z.literal("")),
  mensaje: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.CONTACT_FORM_EMAIL_TO;
const emailFrom =
  process.env.CONTACT_FORM_EMAIL_FROM ||
  "Rincón Casero <onboarding@resend.dev>";

export type ContactFormState = {
  message: string;
  status: "success" | "error";
  errors?: {
    [key: string]: string[] | undefined;
  };
} | null;

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (!emailTo) {
    console.error(
      "Error: CONTACT_FORM_EMAIL_TO no está configurado en las variables de entorno.",
    );
    return {
      status: "error",
      message: "Error interno del servidor. Intenta más tarde.",
    };
  }

  const rawData = {
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    email: formData.get("email"),
    telefono: formData.get("telefono") || "",
    mensaje: formData.get("mensaje"),
  };

  const validatedFields = ContactFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.log(
      "Validation Errors:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      status: "error",
      message: "Error en los datos del formulario.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nombre, apellido, email, telefono, mensaje } = validatedFields.data;

  try {
    console.log("Intentando enviar email a:", emailTo);
    const { error } = await resend.emails.send({
      from: "Contacto Web <onboarding@resend.dev>",
      to: [emailTo],
      subject: `Nuevo Mensaje de Contacto de ${nombre} ${apellido}`,
      replyTo: email,
      html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        status: "error",
        message: "Error al enviar el mensaje. Intenta más tarde.",
      };
    }

    const confirmationEmail = await resend.emails.send({
      from: emailFrom,
      to: [email],
      subject: `Recibimos tu mensaje - Rincón Casero`,
      html: `
        <h1>¡Gracias por contactarnos, ${nombre}!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.</p>
        <p><strong>Tu mensaje fue:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 1em; margin-left: 1em;">
            ${mensaje.replace(/\n/g, "<br>")}
        </blockquote>
        <hr>
        <p>Saludos,<br>El equipo de Rincón Casero</p>
        <p><small>Por favor, no respondas directamente a este correo.</small></p>
    `,
    });

    if (confirmationEmail.error) {
      console.error(
        "Resend Error (Confirmación Usuario):",
        confirmationEmail.error,
      );
      return {
        status: "success",
        message: "¡Mensaje enviado! (Error al enviar confirmación al usuario)",
      };
    }

    return {
      status: "success",
      message: "¡Mensaje enviado con éxito! Te hemos enviado una confirmación.",
    };
  } catch (error) {
    console.error("Error inesperado:", error);
    return {
      status: "error",
      message: "Ocurrió un error inesperado. Intenta más tarde.",
    };
  }
}
