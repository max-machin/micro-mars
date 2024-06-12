/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor (
    @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

}

