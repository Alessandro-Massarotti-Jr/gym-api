import { Request, Response } from "express";
import { GetAllAccountsUseCase } from "./GetAllAccountsUseCase";
import { container } from "tsyringe";

export class GetAllAccountsController {

    async handle(req: Request, res: Response) {

        const getallaccountsUseCase = container.resolve(GetAllAccountsUseCase);

        const accounts = await getallaccountsUseCase.execute();

        return res.returnApi({ data: accounts, message: "Contas no sistema", developerMessage: "All accounts", statusHTTP: 200 });
    }
}