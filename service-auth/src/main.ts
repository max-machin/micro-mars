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
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log(`Service Auth is running`);
}

bootstrap();
