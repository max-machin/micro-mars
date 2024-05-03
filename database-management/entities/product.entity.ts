import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exponent } from './exponent.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 55, nullable: false})
    name: string;

    @Column('float')
    price: number;

    @Column('int')
    stock: number;

    @ManyToOne(() => Exponent, (exponent) => exponent.products)
    exponent: Exponent;
}