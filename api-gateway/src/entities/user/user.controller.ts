import { Body, Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { GetUserRequest } from "./get-user-request.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController implements OnModuleInit {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
        private userService: UserService
    ) {}

    onModuleInit() {
        this.userClient.subscribeToResponseOf('get_user');
    }

    async findMe(@Body() getUserRequest: GetUserRequest): Promise<any> {
        return this.userService.findOneById(getUserRequest.userAuth);
    }
}
