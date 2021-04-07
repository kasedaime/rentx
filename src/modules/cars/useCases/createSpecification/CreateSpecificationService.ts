import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {

  constructor(
    @inject("SpecificationRepository")
    private specificationSRepository: ISpecificationRepository) {
  }

  async execute({ name, description }: IRequest): Promise<void> {

    const specificationAlreadyExists = await this.specificationSRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationSRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationService };