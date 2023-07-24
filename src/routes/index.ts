import express, { Request, Response } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { accountsRoutes } from "./accounts.routes";
import { authRoutes } from "./auth.routes";
import { categoriesRoutes } from "./categories.routes";


export const routes = express.Router();
const authMiddleware = new AuthMiddleware();

routes.get("/", (req, res) => {
    return res.returnApi({ message: "Running" })

});

routes.get("/teste", authMiddleware.auth, (req: Request, res: Response) => {
    console.log(req.auth_user);
    return res.returnApi({ statusHTTP: 200, message: "App running" });
})

routes.use("/auth", authRoutes);

routes.use("/accounts", accountsRoutes);

routes.use("/categories", categoriesRoutes);