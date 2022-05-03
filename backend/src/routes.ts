import { Router } from 'express';
import {CreateUserController} from './useCases/createUser/createUserController' 
import {AuthenticateUserController} from "./useCases/authenticateUser/authenticateUserController";
import {RefreshTokenUserController} from "./useCases/refreshTokenUser/refreshTokenUserController";
import {GetUserController} from "./useCases/getUser/getUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";


const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const getUserController = GetUserController;

router.get('/robots.txt', (req, res) => {
  res.send("Se seu ip estiver no log, voce nao vai pra cadeia, eu vou pra cadeia")
})
router.post('/register', createUserController.handle)
router.get('/user/:id', ensureAuthenticated, getUserController)
router.post('/login', authenticateUserController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)
router.get('/dashboard', ensureAuthenticated, (request, response)=> {
  return response.json([
    {id: 1, name: "curso 1"},
    {id: 2, name: "curso 2"},
    {id: 3, name: "curso 3"},
  ])
})

export { router }
