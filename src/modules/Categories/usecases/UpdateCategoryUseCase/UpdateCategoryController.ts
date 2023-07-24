import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { UpdateCategoryValidation } from "./UpdateCategoryValidation";
import { container } from "tsyringe";

export class UpdateCategoryController {

    async handle(req: Request, res: Response) {

        const { name, description } = UpdateCategoryValidation.validate(req.body);
        const { category_id } = req.params;
        const image_path = req.file?.filename;

        const updatecategoryUseCase = container.resolve(UpdateCategoryUseCase);


        await updatecategoryUseCase.execute({ id: category_id, name, description, image_path });

        return res.returnApi({ data: null, message: "categoria atualizada com sucesso", developerMessage: "", statusHTTP: 200 });
    }
}