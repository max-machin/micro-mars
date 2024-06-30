
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Exponent } from '../exponent/exponent.entity';
import { ExponentActivity } from '../exponent-activity/exponent-activity.entity';
import { ExponentAttachment } from '../exponent-attachment/exponent-attachment.entity';
import { UserController } from './user.controller';
import { AppController } from 'src/app.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TypeOrmModule.forFeature([User, UserRole, Exponent, ExponentActivity, ExponentAttachment])
      ],
      controllers: [AppController, UserController],
      providers: [AppService, UserService],
})
export class UserModule {}


