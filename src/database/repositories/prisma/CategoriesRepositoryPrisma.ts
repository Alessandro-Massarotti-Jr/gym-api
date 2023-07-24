
import { prisma } from ".";
import { ICategory } from "../../../models/Category";

import { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO } from "../ICategoriesRepository";


export class CategoriesRepositoryPrisma implements ICategoriesRepository {
    private repository;

    constructor() {
        this.repository = prisma.categories;
    }
    async findbyName(category_name: string): Promise<ICategory> {
        return await this.repository.findFirst({ where: { name: category_name } }) as ICategory;
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
        const category = await this.repository.findFirst({
            where: {
                id: category_id
            }
        });

        return category as ICategory;
    }
    async getAll(): Promise<ICategory[]> {
        return await this.repository.findMany() as ICategory[];
    }
    async delete(category_id: string): Promise<void> {
        await this.repository.delete({ where: { id: category_id } });
    }
    async update({ id, name, description, image_path }: IUpdateCategoryDTO): Promise<ICategory> {
        const category = await this.repository.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image_path
            }
        });
        return category as ICategory;
    }

}
