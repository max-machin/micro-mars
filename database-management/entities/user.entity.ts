import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exponent } from './exponent.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 55, nullable: false})
    firstname: string;

    @Column({length: 55, nullable: false})
    lastname: string;

    @Column({length: 85, nullable: false, unique: true})
    email: string;

    @ManyToOne(() => Exponent, (exponent) => exponent.users)
    exponent: Exponent[];
}