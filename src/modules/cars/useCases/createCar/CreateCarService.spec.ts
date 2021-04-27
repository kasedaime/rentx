import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarService } from "./CreateCarService";


let createCarService: CreateCarService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarService.execute({
      name: "Name test",
      description: "test description",
      daily_rate: 100,
      fine_amount: 20,
      licence_plate: "87-HV-34",
      brand: "Toyota",
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  });


  it("should not be able to create a car that already exists", () => {

    expect(async () => {
      await createCarService.execute({
        name: "car1",
        description: "test description",
        daily_rate: 100,
        fine_amount: 20,
        licence_plate: "57-HV-34",
        brand: "Toyota",
        category_id: "category"
      });

      await createCarService.execute({
        name: "car2",
        description: "test description",
        daily_rate: 100,
        fine_amount: 20,
        licence_plate: "57-HV-34",
        brand: "Toyota",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should not be able to create a car with available true by default", async () => {

    const car = await createCarService.execute({
      name: "Available car",
      description: "test description",
      daily_rate: 100,
      fine_amount: 20,
      licence_plate: "57-HV-34",
      brand: "Toyota",
      category_id: "category"
    });

    expect(car.available).toBe(true);
  });
});