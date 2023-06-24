import { z } from "zod";

const authenticateuserSchema = z.object({
    email: z.string({ required_error: "Email é obrigatorio", invalid_type_error: "Email deve ser uma string" }).email("O campo Email deve ser um email valido"),
    password: z.string({ required_error: "Senha é obrigatorio", invalid_type_error: "Senha deve ser uma string" }).min(8, "senha deve possuir mais que 8 caracteres"),
});

export class AuthenticateUserValidation {
    static validate(data: z.infer<typeof authenticateuserSchema>): z.infer<typeof authenticateuserSchema> {


        const validateData = authenticateuserSchema.safeParse(data);

        if (!validateData.success) {
            throw new Error(validateData.error.errors[0].message);
        }

        return data;
    }
}
