import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Command } from '../command/command.entity';
import { Exponent } from '../exponent/exponent.entity';
import { UserRole } from '../user-role/user-role.entity';

@Entity()
export class User {

    // Identifiant 
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs
    @Column({length: 55, nullable: false})
    firstname: string;

    @Column({length: 55, nullable: false})
    lastname: string;

    @Column({length: 85, nullable: false, unique: true})
    email: string;

    @Column({length: 85, nullable: false, unique: true})
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date_registery_date: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;
    
    // Relations
    /**
     * Relation User => Exponent
     * La relation avec l'exposant peut être nulle dans le cas ou il s'agit d'un client. Ce dernier n'a 
     * pas de lien avec une entreprise de la foire.
    */
    @ManyToOne(() => Exponent, (exponent) => exponent.users, {nullable: true})
    exponent: Exponent[];

    /**
     * Un client peut passer plusieurs commandes
    */
    @OneToMany(() => Command, (command) => command.user)
    command: Command[]; 

    /**
     * Un utilisateur ne possède qu'un rôle
    */
   @ManyToOne(() => UserRole, (userRole) => userRole.users, {nullable: false})
   userRole: UserRole[];
}