import { Controller, Post, Body } from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { Command } from './schemas/command.schema';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandCreatedEvent } from 'src/order-created.event';

@Controller('commands')
export class CommandController {
  constructor(
    private readonly commandService: CommandService,
  ) {}

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto): Promise<Command> {
    return this.commandService.create(createCommandDto);
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any) {

    // Check des données de la commande
    if (!data.data || !data.data.products || !data.data.user) {
      return 'Erreur, données de commande invalides.';
    }

    // Produits
    let commandProducts = data.data.products;
    // Prix total
    let totalPrice = 0;

    commandProducts.forEach((element: any) => {
      totalPrice += element.price * element.quantity;
    });
    
    // Création de la commande dans MongoDB
    const createCommandDto: CreateCommandDto = {
      // User
      user: data.data.user,
      // Produits
      commandProduct: commandProducts.map((product: any) => ({
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    try {
      // Création de la commande
      let createdCommand = await this.commandService.create(createCommandDto);
      // Formattage de la data pour le service mailer
      const commandCreatedEvent = new CommandCreatedEvent(data.data.products, data.data.user, totalPrice, createdCommand.id);
      // Si il y a une commande crée alors on envoie la donnée au service de mail
      if (commandCreatedEvent && createdCommand){
        return this.commandService.handleOrderCreated(commandCreatedEvent);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error.message);
    }
  }
}
