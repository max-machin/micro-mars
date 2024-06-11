/* eslint-disable prettier/prettier */
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

interface User {
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class AppService {
  private users: User[] = [];

  constructor(
    @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly jwtService: JwtService
  ) {}

  // async onModuleInit() {
  //   this.kafkaClient.subscribeToResponseOf('user_registered');
  //   await this.kafkaClient.connect();
  // }

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ orderId, userId, email, price }: CreateOrderRequest) {
    this.commandClient.emit(
      'order_created',
      new OrderCreatedEvent(orderId, userId, email, price),
    );
  }

  async register(username: string, password: string, email: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, email };
    this.users.push(user);

    this.kafkaClient.emit('user_registered', {
      username,
      email,
    });

    return user;
  }

  async login(username: string, password: string): Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
