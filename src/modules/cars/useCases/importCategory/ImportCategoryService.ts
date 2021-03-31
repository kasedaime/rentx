import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryService {

  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {

    return new Promise((resolve, reject) => {

      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        // csvParse automatically identifies the first field as 'name' and the second as 'description'
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      }).on("error", (err) => {
        reject(err);
      });
    });

  }


  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name, description
        });
      }
    });
  }
}

export { ImportCategoryService };