import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoryRepository();
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const createCategoryController = new CreateCategoryController(createCategoryService);

  return createCategoryController;
}
