import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Exponent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 85, nullable: false, unique: true})
    name: string;

    @Column('int')
    siret: number;

    @Column('int')
    stand_number: number;

    @OneToMany(() => User, (user) => user.exponent)
    users: User[]; 

}