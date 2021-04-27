import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
// Create new specification
specificationsRoutes.post("/", verifyAuthentication, verifyAdmin, createSpecificationController.handle);

export { specificationsRoutes }