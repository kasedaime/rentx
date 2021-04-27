import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

interface iRequest {
  name: string,
  description: string,
  daily_rate: number,
  licence_plate: string,
  fine_amount: number,
  brand: string,
  category_id: string
}

// @injectable()
class CreateCarService {

  constructor(
    // @inject("carsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    fine_amount,
    licence_plate,
    brand,
    category_id
  }): Promise<Car> {

    const carAlreadyExist = await this.carsRepository.findByLicencePlate(licence_plate);

    if (carAlreadyExist) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      fine_amount,
      licence_plate,
      brand,
      category_id
    });

    return car;
  }
}

export { CreateCarService }