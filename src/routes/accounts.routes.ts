import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { GetAccountController } from "../modules/Accounts/usecases/GetAccountUseCase/GetAccountController";
import { GetAllAccountsController } from "../modules/Accounts/usecases/GetAllAccountsUseCase/GetAllAccountsController";
import { UpdatePasswordAccountController } from "../modules/Accounts/usecases/UpdatePasswordAccountUseCase/UpdatePasswordAccountController";
import { ForgotPasswordAccountController } from "../modules/Accounts/usecases/ForgotPasswordAccountUseCase/ForgotPasswordAccountController";
import { CreateAccountController } from "../modules/Accounts/usecases/CreateAccountUseCase/CreateAccountController";
import { UpdateProfileImageController } from "../modules/Accounts/usecases/UpdateProfileImageUseCase/UpdateProfileImageController";

const uploadAccountImage = multer(uploadConfig.upload("./accounts"));

const authMiddleware = new AuthMiddleware();

const createAccountController = new CreateAccountController();
const updatePasswordAccountController = new UpdatePasswordAccountController();
const forgotPasswordAccountController = new ForgotPasswordAccountController();
const getAccountController = new GetAccountController();
const getAllAccountsController = new GetAllAccountsController();
const updateProfileImageController = new UpdateProfileImageController();

const accountsRoutes = Router();

accountsRoutes.get("/", async (req, res) => {
  return await getAllAccountsController.handle(req, res);
});

accountsRoutes.get("/:account_id", async (req, res) => {
  return await getAccountController.handle(req, res);
});

accountsRoutes.post("/", async (req, res) => {
  return await createAccountController.handle(req, res);
});

accountsRoutes.patch("/update-profile-image", authMiddleware.auth, uploadAccountImage.single('file'), async (req, res) => {
  return await updateProfileImageController.handle(req, res);
});

accountsRoutes.patch("/change-password", authMiddleware.auth, async (req, res) => {
  return await updatePasswordAccountController.handle(req, res);
});

accountsRoutes.patch("/forgot-password", async (req, res) => {
  return await forgotPasswordAccountController.handle(req, res);
});

export { accountsRoutes };