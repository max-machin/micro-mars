import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity()
export class ProductAttachment {
    
    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 85, nullable: false, unique: true})
    attachment_url: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    creation_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;

    // Relations 
    /**
     * Un attachment peut appartenir à un seul produit
    */
   @ManyToOne(() => Product, (product) => product.productAttachments)
   product: Product[];
}