import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('order')
export class AppController {
  constructor(
    @Inject('COMMAND_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('command_topic');
    await this.clientKafka.connect();
  }

  @Post('send')
  sendMessage(@Body() message: any) {
    return this.clientKafka.send('command_topic', message);
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
