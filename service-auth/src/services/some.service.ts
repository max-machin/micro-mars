import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {
    const kafkaBroker = this.configService.get<string>('kafka.broker');
    console.log(`Kafka broker: ${kafkaBroker}`);
  }
}
