
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository, IUpdateCategoryDTO } from "../../../../database/repositories/ICategoriesRepository";
import { ApiError } from "../../../../errors/ApiError";
import { deleteFile } from "../../../../utils/deleteFile";

@injectable()
export class UpdateCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute({ id, name, description, image_path }: IUpdateCategoryDTO) {

        const category = await this.categoriesRepository.findByID(id);

        if (!category) {
            throw new ApiError("Categoria não encontrada");
        }

        if (image_path) {
            if (category.image_path) {
                await deleteFile(`.${category.image_path}`)
            }
        }

        await this.categoriesRepository.update({ id, name, description, image_path: image_path ? `/uploads/categories/${image_path}` : category.image_path })

        return;
    }

}