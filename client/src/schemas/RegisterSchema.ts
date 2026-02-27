import { z } from "zod";


export const registerSchema = z
  .object({
    name_user: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),

    last_name: z
      .string()
      .min(3, "Los apellidos son requeridos"),

    email: z
      .string()
      .email("Email no válido"),

    city: z
      .string()
      .min(2, "Ciudad requerida"),

    province: z
      .string()
      .min(2, "Provincia requerida"),

    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo"
      ),

    rep_password: z.string(),

    phone: z
      .string()
      .min(1, "Teléfono requerido")
      .regex(/^\+?[0-9\s-]{9,15}$/, "Solo +, números, espacios, guiones")
      .refine((phone) => {
        const digits = phone.replace(/\D/g, "");
        return digits.length >= 9 && digits.length <= 15;
      }, {
        message: "Debe tener entre 9 y 15 dígitos"
      }),
  })
  .refine((data) => data.password === data.rep_password, {
    message: "Las contraseñas no coinciden",
    path: ["rep_password"],
  });

  export type RegisterForm = z.infer<typeof registerSchema>;