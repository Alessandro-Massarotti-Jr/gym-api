import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { CreateAccountController } from "../modules/Accounts/usecases/CreateAccountUseCase/CreateUserController";
import { GetAccountController } from "../modules/Accounts/usecases/GetAccountUseCase/GetAccountController";
import { GetAllAccountsController } from "../modules/Accounts/usecases/GetAllAccountsUseCase/GetAllAccountsController";
import { UpdatePasswordAccountController } from "../modules/Accounts/usecases/UpdatePasswordAccountUseCase/UpdatePasswordAccountController";
import { ForgotPasswordAccountController } from "../modules/Accounts/usecases/ForgotPasswordAccountUseCase/ForgotPasswordAccountController";

const accountsRoutes = Router();

const authMiddleware = new AuthMiddleware();

const createAccountController = new CreateAccountController();
const updatePasswordAccountController = new UpdatePasswordAccountController();
const forgotPasswordAccountController = new ForgotPasswordAccountController();
const getAccountController = new GetAccountController();
const getAllAccountsController = new GetAllAccountsController();

accountsRoutes.get("/", async (req, res) => {
  return await getAllAccountsController.handle(req, res);
});

accountsRoutes.get("/:account_id", async (req, res) => {
  return await getAccountController.handle(req, res);
});

accountsRoutes.post("/", async (req, res) => {
  return await createAccountController.handle(req, res);
});

accountsRoutes.patch("/change-password", authMiddleware.auth, async (req, res) => {
  return await updatePasswordAccountController.handle(req, res);
});

accountsRoutes.patch("/forgot-password", async (req, res) => {
  return await forgotPasswordAccountController.handle(req, res);
});

export { accountsRoutes };