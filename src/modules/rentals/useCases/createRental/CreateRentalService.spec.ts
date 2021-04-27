import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalService } from "./CreateRentalService";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let createRentalService: CreateRentalService;
let repositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

  const dayAdd24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    repositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(repositoryInMemory, dayjsDateProvider);

  });

  it("should be able to create a new rental", async () => {

    const rental = await createRentalService.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });


  it("should not be able to create a new rental if there's another one open to the same user", async () => {

    expect(async () => {
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hours
      });

      const rental = await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hours
      });
    }).rejects.toBeInstanceOf(AppError);

  });


  it("should not be able to create a new rental if there's another one open to the same car", async () => {

    expect(async () => {
      await createRentalService.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24hours
      });

      const rental = await createRentalService.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24hours
      });
    }).rejects.toBeInstanceOf(AppError);

  });


  it("should not be able to create a new rental with invalid return time", async () => {

    expect(async () => {
      await createRentalService.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);

  });
})