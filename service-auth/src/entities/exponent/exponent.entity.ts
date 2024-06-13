import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ExponentActivity } from '../exponent-activity/exponent-activity.entity';
import { ExponentAttachment } from '../exponent-attachment/exponent-attachment.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Exponent {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 85, nullable: false, unique: true})
    name: string;

    @Column('int')
    siret: number;

    @Column('int')
    stand_number: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    begin_exhibition_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    creation_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;

    // Relations
    /**
     * Un exposant peut posséder un ou plusieurs utilisateurs (dans ce cas "employés")
    */
    @OneToMany(() => User, (user) => user.exponent)
    users: User[]; 

    /**
     * Un exposant peut mettre en vente plusieurs produits
    */
    @OneToMany(() => Product, (product) => product.exponent)
    products: Product[];

    /**
     * Un exposant ne possède qu'un secteur d'activité
    */
     @ManyToOne(() => ExponentActivity, (exponentActivity) => exponentActivity.exponent)
     activity: ExponentActivity[];

    /**
     * Un exposant peut envoyer plusieurs documents
    */
    @OneToMany(() => ExponentAttachment, (exponentAttachment) => exponentAttachment.exponent)
    exponentAttachments: ExponentAttachment[];
}