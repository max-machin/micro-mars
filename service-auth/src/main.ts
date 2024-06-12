import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:29092'],
          clientId: 'nestjs-consumer-client',
        },
        consumer: {
          groupId: 'auth-service-consumer',
          heartbeatInterval: 3000,
          sessionTimeout: 10000,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
