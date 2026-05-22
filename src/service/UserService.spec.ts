import { User } from "../entities/User";
import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('UserService', () => {

    const mockUserRepository = {
        createUser: jest.fn()
    };

    const userService = new UserService(
        mockUserRepository as any
    );

    it('Deve adicionar um novo usuário', async () => {
        const response =  await userService.createUser(
            'Nome',
            'email@email.com',
            '123'
        );

        expect(response)
    });

    it('Deve retornar um token de usuário', async () => {
        const mockUser = new User('Ivan Feigl', 'contatolucianofriebe@gmail.com', '123');
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('contatolucianofriebe@gmail.com', '123');
        expect(token).toBe('token');
    })

    it('Deve retornar um erro se email ou senha inválida', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('contatolucianofriebe@gmail.com', '123')).rejects.toThrow(new Error("E-mail ou senha inválida"))
    })
});