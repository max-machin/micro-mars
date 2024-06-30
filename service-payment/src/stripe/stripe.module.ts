import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Global() // Making it global to avoid multiple imports
@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) => configService.get<string>('STRIPE_API_KEY'),
          inject: [ConfigService],
        },
        StripeService,
      ],
      exports: [StripeService], // Exporting the service for usage in other modules
      controllers: [StripeController],
    };
  }
}
