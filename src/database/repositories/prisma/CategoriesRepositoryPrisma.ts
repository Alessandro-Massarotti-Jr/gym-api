
import { prisma } from ".";
import { ICategory } from "../../../models/Category";

import { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO } from "../ICategoriesRepository";


export class CategoriesRepositoryPrisma implements ICategoriesRepository {
    private repository;

    constructor() {
        this.repository = prisma.categories;
    }
    findbyName(category_name: string): Promise<ICategory> {
        throw new Error("Method not implemented.");
    }
    async create({ name, description, image_path }: ICreateCategoryDTO): Promise<ICategory> {
        const category = await this.repository.create({
            data: {
                name,
                image_path,
                description
            }
        });

        return category as ICategory;
    }
    async findByID(category_id: string): Promise<ICategory> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<ICategory[]> {
        throw new Error("Method not implemented.");
    }
    async delete(category_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async update(data: IUpdateCategoryDTO): Promise<ICategory> {
        throw new Error("Method not implemented.");
    }

}
