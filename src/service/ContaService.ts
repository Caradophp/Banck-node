import { Conta } from "../entities/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { UserService } from "./UserService";

export class ContaService {

    private repository: ContaRepository
    private userService: UserService

    constructor(
        repository: ContaRepository = new ContaRepository(),
        userService: UserService = new UserService()
    ) {
        this.repository = repository
        this.userService = userService
    }

    createAcount = async (user_id: string, nome: string) => {

        const conta = new Conta();

        conta.nome = nome;
        conta.user_id = user_id;

        return await this.repository.createAcount(conta);
    }
    
}