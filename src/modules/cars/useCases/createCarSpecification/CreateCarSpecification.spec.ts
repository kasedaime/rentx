import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";

let createCarSpecificationService: CreateCarSpecificationService;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepositoryInMemory, specificationRepositoryInMemory);
  })

  it("should be able to add a new specification to a car", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "test description",
      daily_rate: 100,
      fine_amount: 20,
      licence_plate: "57-HV-34",
      brand: "Toyota",
      category_id: "category",
      id: "1234",
    });

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test"
    });

    const specification_id = [specification.id];

    const carSpecifications = await createCarSpecificationService.execute({
      car_id: car.id, specification_id
    });

    expect(carSpecifications).toHaveProperty("specifications");
    expect(carSpecifications.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non-existent car", async () => {

    expect(async () => {
      const car_id = "1234";
      const specification_id = ["54321"];

      await createCarSpecificationService.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

})