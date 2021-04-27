import { getRepository, Repository } from "typeorm";
import { ISpecificationRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";



class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

    const specification = this.repository.create({
      description, name
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {

    const specification = this.repository.findOne({
      name
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {

    return await this.repository.findByIds(ids);
  }

}

export { SpecificationRepository };