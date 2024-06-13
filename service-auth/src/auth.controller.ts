/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('auth-topic')
  async handleAuthEvent(@Payload() message: any) {
    console.log('Auth event received:', message.value);

    try {
      const { email, password } = message.value;

      const isValid = await this.authService.validateUser(email, password);

      if (isValid) {
        console.log(`User ${email} authenticated successfully`);
      } else {
        console.log(`Authentication failed for user ${email}`);
      }
    } catch (error) {
      console.error('Error handling auth event:', error);
    }
  }
}
