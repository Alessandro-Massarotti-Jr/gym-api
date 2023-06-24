import { z } from "zod";

const forgotpasswordaccountSchema = z.object({
  email: z
    .string({
      invalid_type_error: "O campo email deve ser uma string",
      required_error: "O campo email é obrigatório.",
    })
    .nonempty({ message: "O campo email não pode ser uma string vazia." }),
});

export class ForgotPasswordAccountValidation {
  static validate(
    data: z.infer<typeof forgotpasswordaccountSchema>
  ): z.infer<typeof forgotpasswordaccountSchema> {
    const validateData = forgotpasswordaccountSchema.safeParse(data);

    if (!validateData.success) {
      throw new Error(validateData.error.errors[0].message);
    }

    return data;
  }
}
