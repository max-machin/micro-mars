import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {

  constructor (
    @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder ({ userId, price}: CreateOrderRequest) {
    this.commandClient.emit(
      'order_created', 
      new OrderCreatedEvent('123', userId, price),
    )
  }
}
