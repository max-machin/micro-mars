/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user.entity';
import { UserRole } from './entities/user-role/user-role.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('auth-topic');
    await this.kafkaClient.connect();
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }

  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const defaultRole = await this.userRoleRepository.findOne({
      where: { name: 'default' },
    });
    if (!defaultRole) {
      throw new HttpException(
        'Default role not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = this.userRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      userRole: defaultRole,
    });

    await this.userRepository.save(user);
    console.log(`User ${email} saved to database.`);

    this.kafkaClient.emit('user_registered', {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered and event sent to Kafka' };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async processUserRegistration(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

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
      userRole: defaultRole,
    });

    await this.userRepository.save(user);
    console.log(`User ${email} saved to database.`);
  }
}


