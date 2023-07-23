import { ICategory } from "../../models/Category";


export interface ICreateCategoryDTO {
    name: string;
    description?: string;
    image_path?: string;
}

export interface IUpdateCategoryDTO {
    id: string;
    name: string;
    description?: string;
    image_path?: string;
}

export interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<ICategory>;
    findByID(category_id: string): Promise<ICategory>;
    findbyName(category_name: string): Promise<ICategory>;
    getAll(): Promise<ICategory[]>;
    delete(category_id: string): Promise<void>;
    update(data: IUpdateCategoryDTO): Promise<ICategory>;
}