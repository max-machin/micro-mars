import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserRole {

    // Identifiant
    @PrimaryGeneratedColumn()
    id: number;

    // Attributs 
    @Column({length: 85, nullable: false, unique: true})
    name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    last_update_date: string;

    /**
     * Un rôle peut appartenir à plusieurs utilisateurs  
    */
    @OneToMany(() => User, (user) => user.userRole)
    users: User[];
}