import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {

  create(data: ICreateCarDTO): Promise<Car>;

  findByLicencePlate(licence_plate: string): Promise<Car>;

  findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;

  findById(id): Promise<Car>;

}

export { ICarsRepository }