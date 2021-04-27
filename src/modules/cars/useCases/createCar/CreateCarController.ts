import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarService } from "./CreateCarService";



class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { brand, category_id, daily_rate, description, fine_amount, licence_plate, name } = request.body;

    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({
      brand, category_id, daily_rate, description, fine_amount, licence_plate, name
    })

    return response.status(201).json(car);
  }
}

export { CreateCarController }