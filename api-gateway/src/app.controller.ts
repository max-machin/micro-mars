/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';
// import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
// import { ClientKafka } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka,
    // private readonly jwtService: JwtService
  ) {}

  // async onModuleInit() {
  //   this.kafkaClient.subscribeToResponseOf('user_registered');
  //   await this.kafkaClient.connect();
  // }

  @Post('order')
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);
  }

  @Post('register')
  async register(
    @Body() body: { username: string; password: string; email: string },
  ) {
    return this.appService.register(body.username, body.password, body.email);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.appService.login(body.username, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('protected')
  getHello(@Request() req): string {
    return `Hello ${req.user.username}`;
  }
}
