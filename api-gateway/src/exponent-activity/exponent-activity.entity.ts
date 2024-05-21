import { Exponent } from 'src/exponent/exponent.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ExponentActivity {

    // Identifiant 
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 55, nullable: false})
    name: string;

    @Column({length: 6, nullable: false})
    code: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;

    // Relations
    /**
     * Un secteur d'activités peut concerné un ou plusieurs exposants
    */
    @OneToMany(() => Exponent, (exponent) => exponent.activity)
    exponent: Exponent[]; 
}