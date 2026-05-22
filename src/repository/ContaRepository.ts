import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { Conta } from "../entities/Conta";

export class ContaRepository {

    private manager: EntityManager;

    constructor (
        manager: EntityManager = AppDataSource.manager          
    ) {
        this.manager = manager
    }

    createAcount = async (conta: Conta) => {
        return this.manager.save(conta);
    }

    listaAcount = async () => {
        return this.manager.query('SELECT * FROM contas');
    }
}