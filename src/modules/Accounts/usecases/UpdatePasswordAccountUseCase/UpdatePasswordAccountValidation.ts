import { z } from "zod";

const updatepasswordSchema = z.object({
  old_password: z
    .string({
      invalid_type_error: "O campo old_password deve ser uma string",
      required_error: "O campo old_password é obrigatório",
    })
    .min(8, "senha antiga deve ser maior ou igual a 8 caracteres"),
  new_password: z
    .string({
      invalid_type_error: "O campo new_password deve ser uma string",
      required_error: "O campo new_password é obrigatório",
    })
    .min(8, "nova senha deve ser maior ou igual a 8 caracteres"),
});

export class UpdatePasswordAccountValidation {
  static validate(
    data: z.infer<typeof updatepasswordSchema>
  ): z.infer<typeof updatepasswordSchema> {
    const validateData = updatepasswordSchema.safeParse(data);

    if (!validateData.success) {
      throw new Error(validateData.error.errors[0].message);
    }

    return data;
  }
}
