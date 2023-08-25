
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../../../database/repositories/ICategoriesRepository";

@injectable()
export class GetAllCategoriesUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute() {
        const categories = await this.categoriesRepository.getAll();
        return categories;
    }

}