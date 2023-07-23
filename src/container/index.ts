import { container } from "tsyringe";
import { IAccountsRepository } from "../database/repositories/IAccountsRepository";
import { AccountsRepositoryPrisma } from "../database/repositories/prisma/AccountsRepositoryPrisma";


container.registerSingleton<IAccountsRepository>("AccountsRepository", AccountsRepositoryPrisma);