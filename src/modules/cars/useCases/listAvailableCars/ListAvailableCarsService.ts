import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { injectable, inject } from "tsyringe";


interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsService {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {

    const cars = await this.carsRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}

export { ListAvailableCarsService }