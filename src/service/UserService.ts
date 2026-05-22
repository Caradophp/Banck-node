import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository()
    ) {
        this.userRepository = userRepository;
    }

    createUser = (nome: string, email: string, senha: string) => {
        const usuario: User = new User(nome, email, senha);
        return this.userRepository.createUser(usuario)
    }

    listOne = (id: string) => {
        return this.userRepository.getUser(id);
    }

    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password);
    }

    getToken = async (email: string, password: string): Promise<string> => {
        const user = await this.getAuthenticatedUser(email, password)

        if (!user) {
            throw new Error("E-mail ou senha inválida");
        }

        const tokenData = {
            id: user.user_id,
            name: user.name,
            email: user.email
        };

        const tokenKey = '12345';

        const tokenOptions = {
            subject: user.user_id
        }

        const token = sign(tokenData, tokenKey, tokenOptions);

        return token;
    }

    getUserCompleteInfos = async (id: string): Promise<User | null> => {
        return await this.userRepository.getUserCompleteInfos(id);
    }

}