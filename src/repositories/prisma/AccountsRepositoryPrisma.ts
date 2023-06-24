import {
  IAccountsRepository,
  ICreateAccountDTO,
  IUpdatePasswordDTO,
} from "../IAccountsRepository";
import { prisma } from ".";
import { IAccount } from "../../models/Account";

export class AccountsRepositoryPrisma implements IAccountsRepository {
  private repository;

  constructor() {
    this.repository = prisma.accounts;
  }
  async updatePassword({
    account_id,
    new_password,
  }: IUpdatePasswordDTO): Promise<void> {
    await this.repository.update({
      where: {
        id: account_id,
      },
      data: {
        password: new_password,
      },
    });
  }
  async get(): Promise<IAccount[]> {
    const accounts = await this.repository.findMany({
      where: { deleted_at: null },
    });
    return accounts as IAccount[];
  }

  async updateLogin(account_id: string): Promise<void> {
    await this.repository.update({
      where: {
        id: account_id,
      },
      data: {
        last_login: new Date(),
      },
    });
    return;
  }

  async create(data: ICreateAccountDTO): Promise<IAccount> {
    const account = await this.repository.create({
      data: {
        email: data.email,
        password: data.password
      },
    });

    return account as IAccount;
  }
  async findById(user_id: string): Promise<IAccount> {
    const account = await this.repository.findFirst({
      where: {
        id: user_id,
        deleted_at: null,
      },
    });

    return account as IAccount;
  }
  async findByEmail(account_email: string): Promise<IAccount> {
    const account = await this.repository.findFirst({
      where: {
        email: account_email,
        deleted_at: null,
      },
    });

    return account as IAccount;
  }
  delete(account_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
