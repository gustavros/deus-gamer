import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Campo e-mail obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .nonempty("Campo senha obrigatório")
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});
