import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    licence_plate,
    brand,
    category_id,
    id
  }: ICreateCarDTO): Promise<Car> {

    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      licence_plate,
      brand,
      category_id,
      id
    });

    this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    return this.cars.find((car) => car.licence_plate === licence_plate);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

    const all = await this.cars.filter((car) => {
      if (car.available === true || ((brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name))) {
        return car;
      }
      return null;
    });
    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }


}

export { CarsRepositoryInMemory }