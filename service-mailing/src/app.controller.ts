import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailingService } from './app.service';

@Controller()
export class MailingController {
  constructor(private mailingService: MailingService) {}

  @EventPattern('command_created')
  async handleEmailSending(@Payload() message: any) {
    console.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    
    // Données du message
    const user_email = message.user;
    const command_id = message.commandId;
    const total_price = message.price;
    const status = message.status;
    const products = message.products;
    let num = 0;

    // Mapper le statut de la commande
    const status_map = { 0: "En traitement", 1: "Expédiée", 2: "Livrée" };
    const order_status = status_map[status] || "Inconnu";

    let email_body = `\
    Chère Alizéa,

    Nous vous remercions pour votre commande sur notre site. Voici les détails de votre commande :

    **Produits commandés :**\n`;

      products.forEach((product: any) => {
        num ++
        email_body += `
    ${num}. **${product.productName}**
      - Quantité : ${product.quantity}
      - Prix unitaire : ${product.price}€\n`;
      });

      email_body += `
    **Montant total de la commande :** ${total_price}€

    **Statut de la commande :** ${order_status}

    Nous vous enverrons une notification une fois que votre commande sera expédiée.

    Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à ce même email.

    Merci pour votre achat !

    Cordialement,

    L'équipe de MICRO MARS
    `;

    try {
      await this.mailingService.sendEmail(
        'alizeamasse@gmail.com',
        'Confirmation de votre commande',
        email_body,
      );
      console.log(`Email processing complete for ${user_email}`);
    } catch (error) {
      console.error(`Error processing email for ${user_email}`, error.stack);
    }
  }
}
