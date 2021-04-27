import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", verifyAuthentication, createRentalController.handle);

export { rentalRoutes }