import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";



class CreateCarSpecificationController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationService = container.resolve(CreateCarSpecificationService);

    const cars = await createCarSpecificationService.execute({
      car_id: id, specification_id
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController }