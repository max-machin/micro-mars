import { Controller } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

export class CommandFormatterDto {
  commandId: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  amount: number;
  currency: string;
}

export class UserFormatterDto {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern('payment_created')
  async createPaymentIntent(@Payload() data: any) {

    const email = data.user.email
    const name = `${data.user.firstname} ${data.user.lastname}`;
    const cardNumber = data.command.cardNumber; // Utilisation d'un token de test
    const expMonth = data.command.expMonth;
    const expYear = data.command.expYear;
    const cvc = data.command.cvc;
    const amount = data.command.amount; // Montant en centimes (10.00 EUR)
    const currency = data.command.currency;

    return { status: 1, data: {email, name, amount, currency}}
       
    // try {
    //   // Create a customer
    //   const customer = await this.stripeService.createCustomer(email, name);

    //   // Create a payment method
    //   const paymentMethod = await this.stripeService.createPaymentMethod(cardNumber, expMonth, expYear, cvc);

    //   // Attach the payment method to the customer
    //   await this.stripeService.attachPaymentMethodToCustomer(paymentMethod.id, customer.id);

    //   // Create a payment intent
    //   const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency, customer.id);

    //   // Check the status of the payment intent
    //   const paymentIntentStatus = await this.stripeService.getPaymentIntent(paymentIntent.id);

    //   console.log('Statut du paiement :', paymentIntentStatus.status);

    //   if (paymentIntentStatus.status === 'succeeded') {
    //     // The payment is successful
    //     return { message: 'Paiement réussi', paymentIntent: paymentIntentStatus };
    //   } else if (paymentIntentStatus.status === 'requires_payment_method') {
    //     // A payment method is required
    //     return { message: 'La méthode de paiement est nécessaire, veuillez mettre à jour votre méthode de paiement.', paymentIntent: paymentIntentStatus };
    //   } else if (paymentIntentStatus.status === 'requires_action') {
    //     // Additional action is required (e.g., 3D Secure)
    //     return { message: 'Le paiement nécessite une action supplémentaire, veuillez compléter l’authentification.', paymentIntent: paymentIntentStatus };
    //   } else {
    //     // The payment failed or is pending
    //     return { message: 'Paiement non validé', paymentIntent: paymentIntentStatus };
    //   }
    // } catch (error) {
    //   // Handle Stripe errors here
    //   throw new Error(`Erreur lors de la création du paiement : ${error.message}`);
    // }
  }
}
