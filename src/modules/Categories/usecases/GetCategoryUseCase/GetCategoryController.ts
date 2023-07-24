import { Request, Response } from "express";
import { GetCategoryUseCase } from "./GetCategoryUseCase";
import { container } from "tsyringe";

export class GetCategoryController {

    async handle(req: Request, res: Response) {

        const { category_id } = req.params;


        const getcategoryUseCase = container.resolve(GetCategoryUseCase);


        const category = await getcategoryUseCase.execute(category_id);

        return res.returnApi({ data: category, message: "Categoria encontrada", developerMessage: "", statusHTTP: 200 });
    }
}