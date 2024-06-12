import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
