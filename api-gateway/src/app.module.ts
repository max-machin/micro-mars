import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMAND_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'service-command',
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'service-command-consumer'
          }
        }
      }
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  
