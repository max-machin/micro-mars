import { InjectRepository } from "@nestjs/typeorm";
import { CommandProduct } from "./command-product.entity";
import { Repository } from "typeorm";

export class CommandProductService {
    constructor(
        @InjectRepository(CommandProduct)
        private commandProductRepository: Repository<CommandProduct>,
    ) {}
    
    create(commandProductData: CommandProduct): Promise<CommandProduct> {
        return this.commandProductRepository.save(commandProductData);
    }
}