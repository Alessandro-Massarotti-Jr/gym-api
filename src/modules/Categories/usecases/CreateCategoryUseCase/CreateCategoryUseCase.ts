
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../../database/repositories/ICategoriesRepository";
import { ApiError } from "../../../../errors/ApiError";
import { deleteFile } from "../../../../utils/deleteFile";

@injectable()
export class CreateCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

    async execute({ name, description, image_path }: ICreateCategoryDTO) {

        const category = await this.categoriesRepository.findbyName(name);

        if (category) {
            if (image_path) {
                await deleteFile(`./uploads/categories/${image_path}`);
            }
            throw new ApiError(`Categoria '${name}' já cadastrada no sistema`);
        }

        await this.categoriesRepository.create({ name, description, image_path: image_path ? `/uploads/categories/${image_path}` : undefined });

        return;
    }

}