import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationService {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) { }


  async execute({ car_id, specification_id }: IRequest): Promise<Car> {

    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car doesn't exist!")
    }

    const specs = await this.specificationsRepository.findByIds(specification_id);

    carExists.specifications = specs;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationService }