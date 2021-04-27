import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListCategoriesController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post("/", verifyAuthentication, verifyAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", verifyAuthentication, verifyAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", verifyAuthentication, verifyAdmin, upload.array("images"), uploadCarImageController.handle);


export { carsRoutes }