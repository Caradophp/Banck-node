import { Request, Response } from "express"
import { UserService } from "../service/UserService"
import { LoginController } from "./LoginController"

describe('LoginController', () => {
    it('Deve validar credenciais do usuário e retornar o token JWT', async () => {
        const mockService: Partial<UserService> = {
            getToken: jest.fn(),
            getAuthenticatedUser: jest.fn()
        }

        const controller = new LoginController(
            mockService as UserService
        )

         const req = {
             body: {
                 email: 'contatolucianofriebe@gmail.com',
                 password: '123'
             }
         } as unknown as Request

         const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response



        const token = await controller.login(req, res)

        expect(token)
    })
})