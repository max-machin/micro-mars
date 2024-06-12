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
          brokers: ['kafka:9092'],
          clientId: 'nestjs-consumer-client',
        },
        consumer: {
          groupId: 'auth-service-consumer',
          heartbeatInterval: 3000, // Intervalle d'envoi des heartbeats
          sessionTimeout: 10000, // Timeout de session pour la détection des échecs
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
