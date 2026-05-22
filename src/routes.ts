import { Router } from "express";
import { UserController } from "./controller/UserController";
import { LoginController } from "./controller/LoginController";
import { verifyAuth } from "./midlleware/verifyAuth";
import { ContaController } from "./controller/ContaController";

export const router = Router();
const userController = new UserController();
const loginController = new LoginController();
const contaController = new ContaController();

router.post('/user', userController.createUser);
router.get('/user/:id', verifyAuth, userController.listAll);
router.get('/user/:id/detalhes', verifyAuth, userController.getUserCompleteInfos);
// router.get()

router.post('/conta', contaController.createAcount)

router.post('/login', loginController.login)