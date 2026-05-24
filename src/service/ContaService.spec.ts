import { ContaRepository } from "../repository/ContaRepository"
import { ContaService } from "./ContaService"

describe('ContaService', () => {
    it('Deve criar uma nova conta', () => {
        const mockService = {
            createAcount: jest.fn()
        }

        const service = new ContaService(mockService as any)

        const createdAcount = service.createAcount('a2b15667-d06c-40c2-b441-2b7cb881bd9e', 'Teste Unitário');

        expect(createdAcount).toBeDefined()
    })
})