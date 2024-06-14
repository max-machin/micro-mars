/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CommandCreatedEvent, OrderCreatedEvent } from './order-created.event';
import { ClientKafka } from '@nestjs/microservices';
import { CreateCommandDto } from './command/dto/create-command.dto';

@Injectable()
export class AppService {
  constructor(
  ) {}
}
