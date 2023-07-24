
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../../../database/repositories/ICategoriesRepository";
import { ApiError } from "../../../../errors/ApiError";
import { deleteFile } from "../../../../utils/deleteFile";

@injectable()
export class DeleteCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute(category_id: string) {

        const category = await this.categoriesRepository.findByID(category_id);

        if (!category) {
            throw new ApiError("Categoria não encontrada");
        }

        if (category.image_path) {
            await deleteFile(`.${category.image_path}`);
        }

        await this.categoriesRepository.delete(category_id);

        return;
    }

}