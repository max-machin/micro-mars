/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'AUTH_SERVICE',
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           brokers: ['kafka:29092'],
  //         },
  //         consumer: {
  //           groupId: 'auth-service-consumer',
  //         },
  //       },
  //     },
  //   ]),
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.register({
  //     secret: 'secretKey',
  //     signOptions: { expiresIn: '60m' },
  //   }),
  // ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
