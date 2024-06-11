/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MailingController } from './app.controller';
import { MailingService } from './app.service';

describe('AppController', () => {
  let mailingController: MailingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailingController],
      providers: [MailingService],
    }).compile();

    mailingController = app.get<MailingController>(MailingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailingController.getHello()).toBe('Hello World!');
    });
  });
});
