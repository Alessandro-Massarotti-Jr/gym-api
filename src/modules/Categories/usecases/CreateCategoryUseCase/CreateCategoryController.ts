import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryValidation } from "./CreateCategoryValidation";
import { container } from "tsyringe";

export class CreateCategoryController {

    async handle(req: Request, res: Response) {

        const { name, description } = CreateCategoryValidation.validate(req.body);

        const image_path = req.file?.filename;

        const createcategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createcategoryUseCase.execute({ name, description, image_path });

        return res.returnApi({ data: null, message: "Categoria criada com sucesso", developerMessage: "", statusHTTP: 201 });
    }
}