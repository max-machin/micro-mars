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
    const str1 = 'N° de commande : ' + orderCreatedEvent.orderId
    const str2 = ', effectuée par le client : ' + orderCreatedEvent.userId
    const str3 = ', email : ' + orderCreatedEvent.email
    const str4 = ', Prix de la commande : ' + orderCreatedEvent.price

    console.log(str1 + str2 + str3 + str4)
    return (str1 + str2 + str3 + str4)
  }

  createOrder(orderCreatedEvent: OrderCreatedEvent) {
    this.mailingClient.emit(
      'order_created',
      new OrderCreatedEvent(orderCreatedEvent.orderId, orderCreatedEvent.userId, orderCreatedEvent.email, orderCreatedEvent.price),
    );
  }
}
