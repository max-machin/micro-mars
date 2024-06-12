/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any) {
    const orderCreatedEvent = new OrderCreatedEvent(data.userAuth, data.productsOrder);
    console.log('Evénement reçu :', orderCreatedEvent);
    this.appService.handleOrderCreated(orderCreatedEvent);
  }
}
