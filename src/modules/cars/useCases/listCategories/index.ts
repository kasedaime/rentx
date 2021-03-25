import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesService } from "./ListCategoriesService";

const categoriesRepository = null;
const listCategoryService = new ListCategoriesService(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoryService);

export { listCategoriesController };