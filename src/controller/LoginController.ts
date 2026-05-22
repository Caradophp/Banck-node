import { Request, Response } from "express";
import { User } from "../entities/User";
import { sign } from 'jsonwebtoken';    
import { UserService } from "../service/UserService";

export class LoginController {

    private userService: UserService;

    constructor (
        userService = new UserService()
    ) {
        this.userService = userService;
    }

    login = async (request: Request, response: Response) => {

        try {
        
            const token = await this.userService.getToken(request.body.email, request.body.password);
            const user = await this.userService.getAuthenticatedUser(request.body.email, request.body.password);

            if (!user) {
                return response.status(500).json({"erro":"E-mail ou senha inválidos"});
            }

            return response.status(200).json({token: token, id: user.user_id });
        } catch (erro: unknown) {
            return response.status(500).json({"erro":"E-mail ou senha inválidos"});
        }
    }

}