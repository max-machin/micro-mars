import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product/product.entity';
import { ProductController } from './entities/product/product.controller';
import { ProductService } from './entities/product/product.service';

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
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}  
