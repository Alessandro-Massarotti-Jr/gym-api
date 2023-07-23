export interface ICategory {
    id: string;
    name: string;
    description?: string;
    image_path?: string;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
}