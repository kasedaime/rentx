import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsService } from "./ListAvailableCarsService";



class ListAvailableCarsController {

  async handle(request: Request, response: Response) {

    const { brand, name, category_id } = request.query;

    const listAvailableCarsService = container.resolve(ListAvailableCarsService);

    const cars = await listAvailableCarsService.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string
    });

    return response.json(cars);
  }

}

export { ListAvailableCarsController }