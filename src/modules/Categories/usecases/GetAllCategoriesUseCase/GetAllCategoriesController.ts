import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";
import { container } from "tsyringe";

export class GetAllCategoriesController {

    async handle(req: Request, res: Response) {

        const getallcategoriesUseCase = container.resolve(GetAllCategoriesUseCase);

        const categories = await getallcategoriesUseCase.execute();

        return res.returnApi({ data: categories, message: "Todas as categorias", developerMessage: "", statusHTTP: 200 });
    }
}