import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exponent } from './exponent.entity';
import { CommandProduct } from './commandProduct.entity';
import { ProductCategory } from './productCategory.entity';
import { ProductAttachment } from './productAttachment.entity';

@Entity()
export class Product {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 55, nullable: false})
    name: string;

    @Column('float')
    price: number;

    @Column('int')
    stock: number;

    @Column({length: 1000, nullable: false})
    desc: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    creation_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;


    // Relations 
    /**
     * Plusieurs produits sont mis en vente par un exposant 
    */
    @ManyToOne(() => Exponent, (exponent) => exponent.products)
    exponent: Exponent;

    /**
     * Many to many custom entre les commandes et les produits permettant d'historiser les produits de la commande
    */
    @OneToMany(() => CommandProduct, (commandProduct) => commandProduct.product)
    public commandProduct : CommandProduct[];

    /**
     * Un produit peut appartenir à une seule catégorie 
    */
    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    category: ProductCategory[];

    /**
     * Un produit peut posséder plusieurs photos
    */
    @OneToMany(() => ProductAttachment, (productAttachment) => productAttachment.product)
    productAttachments: ProductAttachment[];
}