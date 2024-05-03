import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'entities/user.entity';
import { Exponent } from 'entities/exponent.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'micro-mars-general-db',
            synchronize: true,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
        }),
        TypeOrmModule.forFeature([
            User,
            Exponent
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
