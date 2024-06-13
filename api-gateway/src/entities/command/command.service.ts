import { InjectRepository } from "@nestjs/typeorm";
import { Command } from "./command.entity";
import { Repository } from "typeorm";

export class CommandService {
    constructor(
        @InjectRepository(Command)
        private commandRepository: Repository<Command>,
    ) {}

    findAll(): Promise<Command[]> {
        return this.commandRepository.find();
    }
    
    findAllPopulated(): Promise<Command[]> {
        return this.commandRepository.find({ relations: ["user", "category", "productAttachments"] });
    }

    create(commandData: Command): Promise<Command> {
        console.log('je suis dans le service app api-gateway : ' + commandData);

        return this.commandRepository.save(commandData);
    }
}