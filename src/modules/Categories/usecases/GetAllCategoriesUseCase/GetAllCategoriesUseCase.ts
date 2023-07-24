
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../../../database/repositories/ICategoriesRepository";

@injectable()
export class GetAllCategoriesUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute() {

        const categories = await this.categoriesRepository.getAll();

        categories.map((category) => {
            if (category.image_path) {
                category.image_path = `${process.env.APP_URL}${category.image_path}`
            }
        });

        return categories;
    }

}