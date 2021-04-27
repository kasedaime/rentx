import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";



const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// Create new category
categoriesRoutes.post("/", createCategoryController.handle);

// List all categories
categoriesRoutes.get("/", listCategoriesController.handle);

// Upload File
categoriesRoutes.post("/import", upload.single("file"), verifyAuthentication, verifyAdmin, importCategoryController.handle);

export { categoriesRoutes };