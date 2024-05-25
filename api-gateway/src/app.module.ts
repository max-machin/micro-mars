import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'COMMAND_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'service-command',
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'service-command-consumer',
          },
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
