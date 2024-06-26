import { Command } from "../command/command.entity";
import { Product } from "../product/product.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CommandProduct {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column('int')
    quantity: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    creation_date: string;

    // Relations 
    /**
     * Many to many custom entre les commandes et les produits permettant d'historiser les produits de la commande
    */
    @ManyToOne(() => Command, (command) => command.commandProduct)
    public command: Command
    @ManyToOne(() => Product, (product) => product.commandProduct)
    public product: Product
}