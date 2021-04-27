import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";


let authenticateUserService: AuthenticateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserService: CreateUserService;

describe("Authenticate user", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserService = new AuthenticateUserService(usersRepositoryInMemory);
    createUserService = new CreateUserService(usersRepositoryInMemory);
  })


  it("should be able to authenticate a user", async () => {

    const user: ICreateUserDTO = {
      driver_license: "0001234",
      email: "user@teste.com",
      password: "1234",
      name: "test user",
      username: "test"
    };

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexisting user", () => {

    expect(async () => {
      await authenticateUserService.execute({
        email: "false@mail.com",
        password: "1224"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {

    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "564321",
        email: "user@user.com",
        password: "1234",
        name: "test user",
        username: "test"
      };

      await createUserService.execute(user);

      await authenticateUserService.execute({
        email: user.email,
        password: "wrongpassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  })

});