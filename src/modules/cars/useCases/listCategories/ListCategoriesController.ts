import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesService } from "./ListCategoriesService";



class ListCategoriesController {

  async handle(request: Request, response: Response): Promise<Response> {

    const listCategoryService = container.resolve(ListCategoriesService);
    const all = await listCategoryService.execute();
    return response.json(all);
  }
}

export { ListCategoriesController };