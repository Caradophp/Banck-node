import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./User";
import { randomUUID } from "crypto";

@Entity('contas')
export class Conta {

    @PrimaryGeneratedColumn()
    conta_id: string;

    @Column()
    nome: string;

    @Column()
    user_id: string;

    constructor () {
      this.conta_id = randomUUID()
    }
}