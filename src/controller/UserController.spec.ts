import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { UserController } from "./UserController";
import { Params } from "express-serve-static-core";

type MockResponse<TResult> = Partial<Response> & {
  state: {
    status?: number;
    json?: TResult;
  };
};

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn()
  };

    const makeMockRequest = ({
    params,
    query,
    body
    }: {
    params?: Params;
    query?: Params;
    body?: any;
    }): Request => {
    return {
        params: params || {},
        query: query || {},
        body: body || {}
    } as Request;
    };

    function makeMockResponse<TResult>(): MockResponse<TResult> {
        const response: MockResponse<TResult> = {
            state: {},
        };

        response.status = (statusCode: number) => {
            response.state.status = statusCode;
            return response as Response;
        };

        response.json = (json: TResult) => {
            response.state.json = json;
            return response as Response;
        };

        return response;
  }

  const userController = new UserController(
    mockUserService as UserService
  );

  it("Deve adicionar um novo usuário", () => {
    const response = makeMockResponse();

    userController.createUser(
      makeMockRequest({
        body: {
            nome: 'Luciano',
            email: 'luciano@email.com',
            senha: '123456'
        }
        }),
      response as Response
    );

    expect(response).toBeDefined();
  });


  it("Deve avisar falta de campo nome", () => {

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    userController.createUser(
        makeMockRequest({
            body: {
                email: 'luciano@email.com',
                senha: '123456'
            }
        }),
        response as any
    );

      expect(response.json).toHaveBeenCalledWith({'erro': 'Campo [nome] é obrigatório'});
    });
});