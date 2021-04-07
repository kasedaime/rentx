import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "./UpdateUserAvatarService";

class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatarFile = request.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute({ user_id: id, avatarFile });

    return response.status(200).send();
  }
}

export { UpdateUserAvatarController }