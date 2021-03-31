import { inject, injectable } from "tsyringe";
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
      throw new Error("Specification already exists!");
    }

    await this.specificationSRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationService };