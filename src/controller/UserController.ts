import {Request, Response }from 'express';
import { UserService } from '../service/UserService';
import { User } from '../entities/User';

export class UserController {

    private userService: UserService;

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response) => {

        const nome = request.body.nome; 
        const email = request.body.email;
        const senha = request.body.senha;

        if (!nome) {
            return response.status(400).json({'erro': 'Campo [nome] é obrigatório'});
        }

        if (!email) {
            return response.status(400).json({'erro': 'Campo [email] é obrigatório'});
        }

        if (!senha) {
            return response.status(400).json({'erro': 'Campo [senha] é obrigatório'});
        }

        this.userService.createUser(nome, email, senha)
        return response.status(201).json({message: 'Criado com sucesso'});
    }

    listAll = async (request: Request, response: Response) => {
        const { id } = request.params;
        const user: User | null = await this.userService.listOne(id as string);

        if (user === null) {
            return response.status(404).json({"erro": "Usuário não encontrado"});
        }

        console.log(user);
        return response.status(200).json(user);
    }

    getUserCompleteInfos = async (request: Request, response: Response) => {
        const { id } = request.params;

        const user = await this.userService.getUserCompleteInfos(id as string)
        return response.status(200).json(user)
    }

}