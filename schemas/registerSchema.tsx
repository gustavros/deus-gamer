import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Campo nome obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return (
            word.charAt(0).toLocaleUpperCase() +
            word.slice(1).toLocaleLowerCase()
          );
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("Campo e-mail obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .nonempty("Campo senha obrigatório")
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});
