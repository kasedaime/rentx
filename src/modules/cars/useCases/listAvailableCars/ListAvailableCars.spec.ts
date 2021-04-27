import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";


let listCarsService: ListAvailableCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {

    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsService = new ListAvailableCarsService(carsRepositoryInMemory);

  })

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "audi q7",
      description: "hatchback",
      licence_plate: "ab-34-cd",
      fine_amount: 50,
      daily_rate: 200,
      brand: "audi",
      category_id: "khjsgfka"
    });

    const cars = await listCarsService.execute({});

    expect(cars).toEqual([car]);

  });


  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "audi q7",
      description: "hatchback",
      licence_plate: "ab-34-cd",
      fine_amount: 50,
      daily_rate: 200,
      brand: "audi",
      category_id: "khjsgfka"
    });

    const cars = await listCarsService.execute({
      brand: "Car_brand"
    });

    expect(cars).toEqual([car]);
  });

});