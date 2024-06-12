import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Partitioners } from 'kafkajs';

console.log(process.env.KAFKA_BROKER);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'COMMAND_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'service-command',
              brokers: [configService.get<string>('KAFKA_BROKER')],
              createPartitioner: Partitioners.LegacyPartitioner,
            },
            consumer: {
              groupId: 'service-command-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'auth-service',
              brokers: [configService.get<string>('KAFKA_BROKER')],
              createPartitioner: Partitioners.LegacyPartitioner,
            },
            consumer: {
              groupId: 'auth-service-consumer',
              heartbeatInterval: 3000,
              sessionTimeout: 10000,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
