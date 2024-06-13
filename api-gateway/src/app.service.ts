/* eslint-disable prettier/prettier */
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderRequest } from './create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user/user.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ orderId, userId, email, price }: CreateOrderRequest) {
    this.commandClient.emit(
      'order_created',
      new OrderCreatedEvent(orderId, userId, email, price),
    );
  }

  async register(
    firstname: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<any> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      firstname,
      lastname,
      password: hashedPassword,
      email,
    });

    try {
      await this.userRepository.save(user);

      this.kafkaClient.emit('user_registered', {
        email,
      });

      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new HttpException(
        'Error registering user: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
