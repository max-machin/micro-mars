/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CommandCreatedEvent, OrderCreatedEvent } from './order-created.event';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MAILING_SERVICE') private readonly mailingClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated( commandCreatedEvent: CommandCreatedEvent){
    console.log("orderCreated : " , commandCreatedEvent);
    this.mailingClient.emit(
      'order_created',
      new CommandCreatedEvent(commandCreatedEvent.products, commandCreatedEvent.user, commandCreatedEvent.price),
    );
  }

  // createOrder(orderCreatedEvent: OrderCreatedEvent) {
  //   this.mailingClient.emit(
  //     'order_created',
  //     new OrderCreatedEvent(orderCreatedEvent.userAuth, orderCreatedEvent.productsOrder),
  //   );
  // }
}
