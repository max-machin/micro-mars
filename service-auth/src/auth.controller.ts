/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(@Payload() message: any) {
    console.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    try {
      await this.authService.processUserRegistration(
        message.firstname,
        message.email,
      );
      console.log(`User registration processed for ${message.username}`);
    } catch (error) {
      console.error(
        `Error processing user registration for ${message.username}`,
        error.stack,
      );
    }
  }
}
