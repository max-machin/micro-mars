import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('auth-topic');
    await this.clientKafka.connect();
  }

  @Post('login')
  login(@Body() credentials: any) {
    return this.clientKafka.send('auth-topic', credentials);
  }
}
