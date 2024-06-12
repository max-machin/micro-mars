/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';
import { ClientKafka } from '@nestjs/microservices';
@Injectable()
export class AppService {
  constructor(
    @Inject('MAILING_SERVICE') private readonly mailingClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent){
    console.log("orderCreated : " , orderCreatedEvent);
  }

  createOrder(orderCreatedEvent: OrderCreatedEvent) {
    this.mailingClient.emit(
      'order_created',
      new OrderCreatedEvent(orderCreatedEvent.userAuth, orderCreatedEvent.productsOrder),
    );
  }
}
