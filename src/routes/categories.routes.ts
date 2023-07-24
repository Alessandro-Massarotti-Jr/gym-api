import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { GetAllCategoriesController } from "../modules/Categories/usecases/GetAllCategoriesUseCase/GetAllCategoriesController";
import { CreateCategoryController } from "../modules/Categories/usecases/CreateCategoryUseCase/CreateCategoryController";
import { GetCategoryController } from "../modules/Categories/usecases/GetCategoryUseCase/GetCategoryController";
import { UpdateCategoryController } from "../modules/Categories/usecases/UpdateCategoryUseCase/UpdateCategoryController";
import { DeleteCategoryController } from "../modules/Categories/usecases/DeleteCategoryUseCase/DeleteCategoryController";

const uploadCategoryImage = multer(uploadConfig.upload("./categories"));

const authMiddleware = new AuthMiddleware();

const getAllCategoriesController = new GetAllCategoriesController();
const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();


const categoriesRoutes = Router();

categoriesRoutes.get("/", async (req, res) => {
    return await getAllCategoriesController.handle(req, res);
});

categoriesRoutes.get("/:category_id", async (req, res) => {
    return await getCategoryController.handle(req, res);
});

categoriesRoutes.post("/", uploadCategoryImage.single('file'), async (req, res) => {
    return await createCategoryController.handle(req, res);
});


categoriesRoutes.put("/:category_id", uploadCategoryImage.single('file'), async (req, res) => {
    return await updateCategoryController.handle(req, res);
});


categoriesRoutes.delete("/:category_id", async (req, res) => {
    return await deleteCategoryController.handle(req, res);
});


export { categoriesRoutes };