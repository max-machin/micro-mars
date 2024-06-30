import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module'; // Importez le module Stripe
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(), StripeModule.forRootAsync()], // Ajoutez le module Stripe ici
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 