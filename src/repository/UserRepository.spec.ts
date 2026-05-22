import { EntityManager } from "typeorm";
import { UserRepository } from "./UserRepository";
import { User } from "../entities/User";

describe('UserRepository', () => {
    let userRepository: UserRepository;

    interface MockManager {
        saveReturn?: object | [object]
        findOneReturn?: object
    }

    const mockEntityManager = async ({saveReturn =  undefined, findOneReturn = undefined}: MockManager): Promise<EntityManager> => {
        const manager: Partial<EntityManager> = {}

        manager.save = jest.fn().mockImplementation(() => {
            return Promise.resolve(saveReturn)
        });

        manager.findOne = jest.fn().mockImplementation(() => {
            return Promise.resolve(findOneReturn)
        });

        return manager as EntityManager;
    }

    const userMock: User = {
        // id_user: '12345',
        user_id: '123',
        name: 'Teste',
        email: 'Teste',
        password: '123'
    }

    beforeAll(async () => {
        const mock = await mockEntityManager({})
        userRepository = new UserRepository(mock)
    })

    it('Deve cadastrar um novo usuário no banco de dados', async () => {
        await userRepository.createUser(userMock);
        await userRepository.getUser('123');
    })
});