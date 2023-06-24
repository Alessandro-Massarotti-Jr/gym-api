import { Request, Response } from "express";
import { AuthenticateAccountUseCase } from "./AuthenticateUserUseCase";
import { container } from "tsyringe";
import { z } from "zod";
import { ApiError } from "../../../../errors/ApiError";


class AuthenticateUserController {

    async handle(req: Request, res: Response) {

        const authUserSchema = z.object({
            email: z.string({ required_error: "Email é obrigatorio", invalid_type_error: "Email deve ser uma string" }).email("O campo Email deve ser um email valido"),
            password: z.string({ required_error: "Senha é obrigatorio", invalid_type_error: "Senha deve ser uma string" }).min(8, "senha deve possuir mais que 8 caracteres"),
        });

        const validatedeDate = authUserSchema.safeParse(req.body);

        if (!validatedeDate.success) {
            throw new ApiError(validatedeDate.error.errors[0].message, 400);
        }


        const { password, email } = req.body;

        const authenticateAccountUseCase = container.resolve(AuthenticateAccountUseCase);

        const token = await authenticateAccountUseCase.execute({ password, email });

        return res.returnApi({ data: token, developerMessage: "authorized", message: "Authenticado com sucesso", statusHTTP: 200 });

    }

}

export { AuthenticateUserController }