import { Request, Response } from "express";
import { GetAccountUseCase } from "./GetAccountUseCase";
import { container } from "tsyringe";

export class GetAccountController {

    async handle(req: Request, res: Response) {

        const { account_id } = req.params;

        const getaccountUseCase = container.resolve(GetAccountUseCase);

        const account = await getaccountUseCase.execute(account_id);

        return res.returnApi({ data: account, message: "Conta encontrada", developerMessage: "account find", statusHTTP: 200 });
    }
}