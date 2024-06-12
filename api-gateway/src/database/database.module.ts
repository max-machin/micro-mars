/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user/user.entity';
import { Exponent } from '../entities/exponent/exponent.entity';
import { Command } from '../entities/command/command.entity';
import { UserRole } from '../entities/user-role/user-role.entity';
import { CommandProduct } from '../entities/command-product/command-product.entity';
import { ExponentActivity } from '../entities/exponent-activity/exponent-activity.entity';
import { ExponentAttachment } from '../entities/exponent-attachment/exponent-attachment.entity';
import { Product } from '../entities/product/product.entity';
import { ProductAttachment } from '../entities/product-attachment/product-attachment.entity';
import { ProductCategory } from '../entities/product-category/product-category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: parseInt(configService.get<string>('MYSQL_PORT'), 10),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [
          User,
          Exponent,
          Command,
          UserRole,
          CommandProduct,
          ExponentActivity,
          ExponentAttachment,
          Product,
          ProductAttachment,
          ProductCategory,
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Exponent,
      Command,
      UserRole,
      CommandProduct,
      ExponentActivity,
      ExponentAttachment,
      Product,
      ProductAttachment,
      ProductCategory,
    ]), 
  ],
})
export class DatabaseModule {}
