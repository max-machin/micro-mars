/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandCreatedEvent, OrderCreatedEvent } from './order-created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any) {

    if (!data.data){
      return 'Erreur, pas de données pour la commande.';
    }

    let commandProducts = data.data.products;
    let totalPrice = 0

    commandProducts.forEach(element => {
      totalPrice += element.price * element.quantity
    });

    const commandCreatedEvent = new CommandCreatedEvent(data.data.products, data.data.user, totalPrice);
    console.log('Evénement reçu :', commandCreatedEvent);
    this.appService.handleOrderCreated(commandCreatedEvent);
  }
}
