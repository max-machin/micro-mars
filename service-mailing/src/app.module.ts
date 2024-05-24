/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';
import { MailingService } from './app.service';
import { MailingController } from './app.controller';

@Module({
  imports: [],
  controllers: [MailingController],
  providers: [MailingService],
})
export class MailingModule  {}
