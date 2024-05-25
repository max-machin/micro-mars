import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Command } from '../command/command.entity';
import { Exponent } from '../exponent/exponent.entity';
import { UserRole } from '../user-role/user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55, nullable: false })
  firstname: string;

  @Column({ length: 55, nullable: false })
  lastname: string;

  @Column({ length: 85, nullable: false, unique: true })
  email: string;

  @Column({ length: 85, nullable: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_registery_date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: string;

  @ManyToOne(() => Exponent, (exponent) => exponent.users, { nullable: true })
  exponent: Exponent;

  @OneToMany(() => Command, (command) => command.user)
  commands: Command[];

  @ManyToOne(() => UserRole, (userRole) => userRole.users, { nullable: false })
  userRole: UserRole;
}
