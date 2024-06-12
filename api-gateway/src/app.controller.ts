/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('order')
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      firstname: string;
      lastname: string;
      password: string;
      email: string;
    },
  ) {
    return this.appService.register(
      body.firstname,
      body.lastname,
      body.password,
      body.email,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.appService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('protected')
  getHello(@Request() req): string {
    return `Hello ${req.user.email}`;
  }
}
