import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


@injectable()
class ListCategoriesService {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {

    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesService };