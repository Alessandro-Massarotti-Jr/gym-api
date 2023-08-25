import { Category } from "../../models/Category";


export interface ICreateCategoryDTO {
    name: string;
    description?: string | null;
    image_path?: string | null;
}

export interface IUpdateCategoryDTO {
    id: string;
    name: string;
    description?: string | null;
    image_path?: string | null;
}

export interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<Category>;
    findByID(category_id: string): Promise<Category | null>;
    findbyName(category_name: string): Promise<Category | null>;
    getAll(): Promise<Category[]>;
    delete(category_id: string): Promise<void>;
    update(data: IUpdateCategoryDTO): Promise<Category | null>;
}