import { Request, response, Response } from "express";
import { ContaService } from "../service/ContaService";

export class ContaController {

    private service: ContaService;

    constructor (
        service: ContaService = new ContaService()
    ) {
        this.service = service;
    }

    createAcount = async (request: Request, response: Response) => {
        const created = this.service.createAcount(request.body.user_id, request.body.nome)
        return response.status(201).json({created})
    }

    listAcount = async (request: Request, response: Response) => {
        const data = await this.service.listAcount();
        return response.status(200).json({data})
    }

}