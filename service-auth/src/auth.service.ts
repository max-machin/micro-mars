/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user/user.entity';
import { UserRole } from './entities/user-role/user-role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async processUserRegistration(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Trouver le rôle par défaut
    const defaultRole = await this.userRoleRepository.findOne({
      where: { name: 'default' },
    });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    const user = this.userRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      userRole: defaultRole, // Assigner le rôle par défaut
    });

    await this.userRepository.save(user);
    console.log(`User ${email} saved to database.`);
  }
}
