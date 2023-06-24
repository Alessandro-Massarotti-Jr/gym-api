import { Router } from "express";
import { AuthenticateUserController } from "../modules/Accounts/usecases/AuthenticateUserUseCase/AuthenticateUserController";


const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/", async (req, res) => {
    return await authenticateUserController.handle(req, res);
});

export { authRoutes }