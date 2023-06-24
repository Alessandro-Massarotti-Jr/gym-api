import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";;
import { z } from "zod";
import { ApiError } from "../../../../errors/ApiError";
import { container } from "tsyringe";

class CreateAccountController {

    async handle(req: Request, res: Response) {


        const createAccountSchema = z.object({
            email: z.string({ required_error: "Email é obrigatorio", invalid_type_error: "Email deve ser uma string" }).email("O campo deve ser um email valido"),
            password: z.string({ required_error: "Senha é obrigatorio", invalid_type_error: "Senha deve ser uma string" }).min(8, "senha deve possuir mais que 8 caracteres"),
        });

        const validatedeDate = createAccountSchema.safeParse(req.body);

        if (!validatedeDate.success) {
            throw new ApiError(validatedeDate.error.errors[0].message, 400);
        }


        const { email, password }: z.infer<typeof createAccountSchema> = req.body;

        const createAccountUseCase = container.resolve(CreateAccountUseCase);


        await createAccountUseCase.execute({ email, password });

        return res.returnApi({ data: null, message: "Conta criada com sucesso", developerMessage: "account created", statusHTTP: 201 });
    }
}

export { CreateAccountController }