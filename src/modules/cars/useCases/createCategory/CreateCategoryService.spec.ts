import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;


describe("Create new category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {

    const category = {
      name: "category teste",
      description: "test description"
    }

    await createCategoryService.execute({
      name: category.name,
      description: category.description
    });

    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

    expect(createdCategory).toHaveProperty("id");

  });

  it("should not be able to create existing category", async () => {

    expect(async () => {
      const category = {
        name: "category teste",
        description: "test description"
      }

      await createCategoryService.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError);

  });
});