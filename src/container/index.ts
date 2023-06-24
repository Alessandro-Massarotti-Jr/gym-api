import { container } from "tsyringe";
import { IAccountsRepository } from "../repositories/IAccountsRepository";
import { AccountsRepositoryPrisma } from "../repositories/prisma/AccountsRepositoryPrisma";

container.registerSingleton<IAccountsRepository>("AccountsRepository", AccountsRepositoryPrisma);