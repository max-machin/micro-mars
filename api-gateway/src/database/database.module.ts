import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['/src/db/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_historic',
      }),
    }),
  ],
})
export class DatabaseModule {}
