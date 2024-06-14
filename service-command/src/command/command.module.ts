import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { Command, CommandSchema } from './schemas/command.schema'; // Assurez-vous d'importer Command et CommandSchema
import { AppService } from 'src/app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Command.name, schema: CommandSchema },
    ]),
    ClientsModule.register([
      {
        name: 'MAILING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:29092'],
            clientId: 'mailing',
          },
          consumer: {
            groupId: 'mailing-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CommandController],
  providers: [CommandService, AppService], // Assurez-vous que CommandService est inclus ici
  exports: [CommandService], // Si nécessaire
})
export class CommandModule {}
