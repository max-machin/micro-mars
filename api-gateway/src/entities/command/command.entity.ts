import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { CommandProduct } from '../command-product/command-product.entity';

@Entity()
export class Command {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    creation_command_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    delivery_date: string;

    @Column({ type: "int", default: 0 })
    status: number;

    // Relations 
    /**
     * Many to many custom entre les commandes et les produits permettant d'historiser les produits de la commande
    */
    @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.command)
    public commandProduct : CommandProduct[];

    /**
     * Une commande est passée par un seul client.
    */
    @ManyToOne(() => User, (user) => user.command, {nullable: true})
    user: User[];
}