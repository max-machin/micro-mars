import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { GetUserRequest, UserAskDto } from "./get-user-request.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController implements OnModuleInit {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
        private userService: UserService
    ) {}

    @Post('/auth')
    async auth(@Body() getUserRequest: UserAskDto): Promise<any> {
        console.log(getUserRequest);
        const user = await this.userService.findOneByEmail(getUserRequest);

        return getUserRequest
    }

    onModuleInit() {
        this.userClient.subscribeToResponseOf('get_user');
    }

    async findMe(@Body() getUserRequest: GetUserRequest): Promise<any> {
        return this.userService.findOneById(getUserRequest.userAuth);
    }
}
