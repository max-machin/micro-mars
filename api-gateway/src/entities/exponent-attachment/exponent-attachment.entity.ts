import { Exponent } from '../exponent/exponent.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ExponentAttachment {

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
     * Un attachment peut-être post par un seul exposant 
    */
   @ManyToOne(() => Exponent, (exponent) => exponent.exponentAttachments)
   exponent: Exponent[];
}