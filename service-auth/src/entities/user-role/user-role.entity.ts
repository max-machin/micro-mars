/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 85, nullable: false, unique: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: string;

  @OneToMany(() => User, (user) => user.userRole)
  users: User[];
}
