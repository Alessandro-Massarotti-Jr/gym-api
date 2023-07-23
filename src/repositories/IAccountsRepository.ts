import { IAccount } from "../models/Account";

export interface ICreateAccountDTO {
    email: string;
    password: string;
    name: string;
}

export interface IUpdatePasswordDTO {
    account_id: string
    new_password: string;
}

export interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<IAccount>;
    findById(account_id: string): Promise<IAccount>;
    findByEmail(account_email: string): Promise<IAccount>;
    delete(account_id: string): Promise<void>;
    updateLogin(account_id: string): Promise<void>;
    get(): Promise<IAccount[]>;
    updatePassword(data: IUpdatePasswordDTO): Promise<void>;
}