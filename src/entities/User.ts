import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto';
import { Conta } from "./Conta";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: string

    @Column({nullable: false})
    name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string

    constructor(name: string, email: string, password: string) {
        this.user_id = randomUUID()
        this.name = name;
        this.email = email;
        this.password = password
    }
}
