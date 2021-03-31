import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./CreateUserService"


class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { name, username, email, password, driver_license } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      username,
      email,
      driver_license,
      password
    });

    return response.status(201).send();
  }
}

export { CreateUserController }