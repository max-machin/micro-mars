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
      // Extraire les informations de l'utilisateur du message
      const { user, password } = message.value;

      // Valider les informations de l'utilisateur
      const isValid = await this.authService.validateUser(user, password);

      if (isValid) {
        console.log(`User ${user} authenticated successfully`);
        // Vous pouvez ajouter d'autres actions à effectuer après une validation réussie
      } else {
        console.log(`Authentication failed for user ${user}`);
        // Vous pouvez ajouter d'autres actions à effectuer après un échec de validation
      }
    } catch (error) {
      console.error('Error handling auth event:', error);
    }
  }
}
