/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailingService } from './app.service';
import { MailingController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot()],  controllers: [MailingController],
  providers: [MailingService],
})
export class MailingModule  {}
