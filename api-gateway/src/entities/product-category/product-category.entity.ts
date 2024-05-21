import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ProductCategory {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 85, nullable: false, unique: true})
    name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;

    // Relations 
    /**
     * Une catégorie appartient à plusieurs produits 
    */
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
