
import { prisma } from ".";
import { Category } from "../../../models/Category";

import { ICategoriesRepository, ICreateCategoryDTO, IUpdateCategoryDTO } from "../ICategoriesRepository";


export class CategoriesRepositoryPrisma implements ICategoriesRepository {
    private repository;

    constructor() {
        this.repository = prisma.category;
    }
    async findbyName(category_name: string): Promise<Category | null> {
        const category = await this.repository.findFirst({ where: { name: category_name } });

        return category ? new Category(category) : null;
    }
    async create({ name, description, image_path }: ICreateCategoryDTO): Promise<Category> {
        const category = await this.repository.create({
            data: {
                name,
                image_path,
                description
            }
        });

        return new Category(category);
    }
    async findByID(category_id: string): Promise<Category | null> {
        const category = await this.repository.findFirst({
            where: {
                id: category_id
            }
        });

        return category ? new Category(category) : null;
    }

    async getAll(): Promise<Category[]> {
        const categories = await this.repository.findMany();
        return Category.fromArray(categories);
    }
    async delete(category_id: string): Promise<void> {
        await this.repository.delete({ where: { id: category_id } });
    }
    async update({ id, name, description, image_path }: IUpdateCategoryDTO): Promise<Category | null> {
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
        return category ? new Category(category) : null;
    }

}
