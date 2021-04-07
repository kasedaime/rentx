import { Router } from "express";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
// Create new specification
specificationsRoutes.use(verifyAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes }