import { Request, Response } from "express";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { container } from "tsyringe";

export class DeleteCategoryController {

    async handle(req: Request, res: Response) {

        const { category_id } = req.params;

        const deletecategoryUseCase = container.resolve(DeleteCategoryUseCase);

        await deletecategoryUseCase.execute(category_id);

        return res.returnApi({ data: null, message: "Categoria deletada com sucesso", developerMessage: "", statusHTTP: 200 });
    }
}