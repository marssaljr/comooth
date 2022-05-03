import {Request, Response} from 'express';
import {CreateUserUseCase} from './createUserUseCase';

class CreateUserController {

  async handle(request: Request, response: Response) {
    const {username, name, password} = request.body
    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({
      username,
      password,
      name,
    });

    return response.json(user);
  }
}

export { CreateUserController }
