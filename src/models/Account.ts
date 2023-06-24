
export interface IAccount {
    id: string;
    email: string;
    password?: string;
    last_login?: Date;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
}