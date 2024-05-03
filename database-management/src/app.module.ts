import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

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
            migrations: ['/src/db/migrations/*{.ts,.js}'],
            migrationsTableName: "migrations_historic",
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
