
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../../../database/repositories/ICategoriesRepository";
import { ApiError } from "../../../../errors/ApiError";

@injectable()
export class GetCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute(category_id: string) {

        const category = await this.categoriesRepository.findByID(category_id);

        if (!category) {
            throw new ApiError("Categoria não encontrada");
        }

        return category;
    }

}