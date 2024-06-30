import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { GetUserEventDto } from "./dto/get-user.dto";

export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(userId: number): Promise<string> {

        let userFind = await this.userRepository.findOne({
            where: {
                id: userId,
            }
        });

        const userEvent = new GetUserEventDto(userFind.id, userFind.email, userFind.firstname, userFind.lastname, ).toSring()

        return userEvent;
    }
}