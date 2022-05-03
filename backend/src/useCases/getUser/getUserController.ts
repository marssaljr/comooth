import { Request, Response} from "express";
import { GetUserUseCase } from "./getUserUseCase";

export async function GetUserController(request: Request, response: Response) {
  const refreshToken = request.params.id;
  const auth = request.headers.authorization;
  console.log("Controller: ",refreshToken)

  // Remove "Bearer"
  const [, token] = auth.split(" "); 

  // verify token
  const getUserUseCase = new GetUserUseCase()
  try {
    const user = await getUserUseCase.execute(refreshToken, token)
    return response.status(200).json(user);
  } catch(err) {
    return response.status(401).json({
      message: 'User not found',
    })
  }
}
