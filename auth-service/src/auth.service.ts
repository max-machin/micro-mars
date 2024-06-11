/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users: any[] = []; 

  async processUserRegistration(username: string, email: string): Promise<void> {
    const user = { username, email, registeredAt: new Date() };
    this.users.push(user);
    console.log(`User ${username} has been registered with email ${email}`);
  }
}
