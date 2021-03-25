import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {

  constructor(private specificationSRepository: ISpecificationRepository) {

  }

  execute({ name, description }: IRequest): void {

    const specificationAlreadyExists = this.specificationSRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationSRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationService };