import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent){
    const str1 = 'N° de commande : ' + orderCreatedEvent.orderId
    const str2 = ', effectuée par le client : ' + orderCreatedEvent.userId
    const str3 = ', Prix de la commande : ' + orderCreatedEvent.price
    console.log(str1 + str2 + str3)
    return (str1 + str2 + str3)
  }
}
