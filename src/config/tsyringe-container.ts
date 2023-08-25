import { container } from "tsyringe";
import { IAccountsRepository } from "../database/repositories/IAccountsRepository";
import { AccountsRepositoryPrisma } from "../database/repositories/prisma/AccountsRepositoryPrisma";
import { ICategoriesRepository } from "../database/repositories/ICategoriesRepository";
import { CategoriesRepositoryPrisma } from "../database/repositories/prisma/CategoriesRepositoryPrisma";


container.registerSingleton<IAccountsRepository>("AccountsRepository", AccountsRepositoryPrisma);

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepositoryPrisma);
