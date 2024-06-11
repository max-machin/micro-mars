/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailingService } from './app.service';

@Controller()
export class MailingController {
  constructor(private mailingService: MailingService) {}

  @EventPattern('order_created')
  async handleEmailSending(@Payload() message: any) {
    console.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    try {
      await this.mailingService.sendEmail(
        message.email,
        'Order Confirmation',
        `Your order with ID ${message.orderId} has been received.`,
      );
      console.log(`Email processing complete for ${message.email}`);
    } catch (error) {
      console.error(`Error processing email for ${message.email}`, error.stack);
    }
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
