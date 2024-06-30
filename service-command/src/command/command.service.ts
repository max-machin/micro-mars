import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command } from './schemas/command.schema';
import { CreateCommandDto } from './dto/create-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { CommandCreatedEvent } from 'src/order-created.event';

@Injectable()
export class CommandService {
  constructor(
    @InjectModel(Command.name) private readonly commandModel: Model<Command>,
    @Inject('MAILING_SERVICE') private readonly mailingClient: ClientKafka,
  ) {}

  async create(createCommandDto: CreateCommandDto): Promise<Command> {
    const createdCommand = new this.commandModel(createCommandDto);
    return createdCommand.save();
  }

  async findAll(): Promise<Command[]> {
    return this.commandModel.find().exec();
  }

  async findCommand(id: string): Promise<Command> {
    try {
      const command = await this.commandModel.findById(id);
      return command;
    } catch (error) {
      throw new Error(`Erreur lors de la recherche de la commande : ${error.message}`);
    }
  }

  handleOrderCreated( commandCreatedEvent: CommandCreatedEvent){
  
    this.mailingClient.emit(
      'command_created',
      new CommandCreatedEvent(
        commandCreatedEvent.products, 
        commandCreatedEvent.user, 
        commandCreatedEvent.price, 
        commandCreatedEvent.commandId,
        commandCreatedEvent.status).toSring(),
    );

    return new CommandCreatedEvent(
      commandCreatedEvent.products, 
      commandCreatedEvent.user, 
      commandCreatedEvent.price, 
      commandCreatedEvent.commandId,
      commandCreatedEvent.status).toSring();
  }

  async updateCommand(commandId: number): Promise<Command>{
    const updatedCommand = await this.commandModel.findByIdAndUpdate(commandId, {status: 1} , {new: true})
    return updatedCommand
  }
}
