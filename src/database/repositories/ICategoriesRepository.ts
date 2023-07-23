import { ICategory } from "../../models/Category";


export interface ICreateCategoryDTO {
    name: string;
    description?: string;
    image_path?: String;
}

export interface IUpdateCategoryDTO {
    name: string;
    description?: string;
    image_path?: String;
}

export interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<ICategory>;
    findByID(category_id: string): Promise<ICategory>;
    getAll(): Promise<ICategory[]>;
    delete(category_id: string): Promise<void>;
    update(data: IUpdateCategoryDTO): Promise<ICategory>;
}