import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  user_id: string;
}

export async function verifyAuthentication(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing token", 401);
  }

  // example: Bearer lçkhhgqklrjghkjhgkfdjhgaklçjrehlkejg
  // [0] - Bearer
  // [1] - lçkhhgqklrjghkjhgkfdjhgaklçjrehlkejg
  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(token, "f875eba085941cc78509bd3482dc0294") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401)
  }
}