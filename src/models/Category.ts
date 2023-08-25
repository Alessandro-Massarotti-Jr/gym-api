import { v4 } from "uuid";

export interface ICategory {
    id?: string;
    name: string;
    description: string | null;
    image_path: string | null;
    deleted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export class Category {
    id: string;
    name: string;
    description: string | null;
    image_path: string | null;
    deleted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;

    constructor({ name, created_at, deleted_at, description, id, image_path, updated_at }: ICategory) {
        if (id) {
            this.id = id;
        } else {
            this.id = v4();
        }
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        if (image_path) {
            this.image_path = `${process.env.APP_URL}${image_path}`;
        } else {
            this.image_path = null;
        }

    }

    static fromArray(categoriesArray: ICategory[]): Category[] {
        return categoriesArray.map(category => new Category(category));
    }

}