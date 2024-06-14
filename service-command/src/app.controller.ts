/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandCreatedEvent, OrderCreatedEvent } from './order-created.event';
import { CommandService } from './command/command.service';

@Controller()
export class AppController {
  constructor(
 
  ) {}
}
