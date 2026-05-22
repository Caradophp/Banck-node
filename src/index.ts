import express, {Request, Response }from 'express';
import { UserController } from './controller/UserController';
import { router } from './routes';
import 'reflect-metadata';
import { AppDataSource } from './database';
import { LoginController } from './controller/LoginController';
const userController = new UserController();
const loginController = new LoginController();

const cors = require('cors');
const server = express();   
server.use(express.json());
server.use(cors())
server.use(router)

// server.get('/', (request: Request, response: Response)  => {
//     return userController.listAll(request, response);
// });

// server.post('/', (request: Request, response: Response) => {
//     return userController.createUser(request, response);
// })

AppDataSource.initialize();
server.listen(5000, () => console.log('Iniciando servidor...'));