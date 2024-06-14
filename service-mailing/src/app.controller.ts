import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailingService } from './app.service';

@Controller()
export class MailingController {
  constructor(private mailingService: MailingService) {}

  @EventPattern('command_created')
  async handleEmailSending(@Payload() message: any) {
    console.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    try {
        if (message && message.data && message.data.user) {
            const { user, products } = message.data;
            const emailBody = `Your order includes the following products:\n\n${products.map(product => `${product.productName} - Quantity: ${product.quantity} - Price: $${product.price}`).join('\n')}`;
            
            await this.mailingService.sendEmail(
                user,
                'Order Confirmation',
                emailBody,
            );
            console.log(`Email processing complete for ${user}`);
        } else {
            throw new Error('Invalid message format');
        }
    } catch (error) {
        console.error(`Error processing email for ${message.data ? message.data.user : 'unknown user'}`, error.stack);
    }
}

}