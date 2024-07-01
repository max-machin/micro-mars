import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { GetUserEvent } from "./get-user.event";
import { UserAskDto, UserAuthDto } from "./get-user-request.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOneById(userAuth: UserAuthDto): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userClient.send(
                'get_user',
                new GetUserEvent(userAuth)
            ).subscribe((user) => {
                if (!user) {
                    return reject(new Error('Une erreur est survenue lors de l\'authentification.'));
                }

                console.log(
                    `Utilisateur en provenance du service-auth : 
                    id : ${user.id},  
                    firstname : ${user.firstname},
                    lastname : ${user.lastname},
                    email : ${user.email}`
                );

                resolve(user);
            });
        });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async authUser(userAuth: UserAuthDto): Promise<User> {
        return this.findOneById(userAuth);
    }

    async findOneByEmail(userAsk: UserAskDto): Promise<User> {
        return this.userRepository.findOne({email: userAsk.email});
    }
}
