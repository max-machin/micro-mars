import { Body, Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { GetUserDto } from "./dto/get-user.dto";

@Controller('users')
export class UserController {
    constructor (
        private userService: UserService
    ) {}

    @MessagePattern('get_user')
    async findall(@Payload() data: any): Promise<any>{
        console.log(data.data);

        if (!data || !data.data){
            return 'Une erreur est survenue lors du transfert des données';
        }        
        
        return await this.userService.findOneById(data.data.userId);
    }
}