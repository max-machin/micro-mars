import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}