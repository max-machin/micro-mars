/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { User } from './entities/user/user.entity';
import { UserRole } from './entities/user-role/user-role.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: parseInt(configService.get<string>('MYSQL_PORT'), 10),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [User, UserRole],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, UserRole]),
    AuthModule,
  ],
})
export class AppModule {}
