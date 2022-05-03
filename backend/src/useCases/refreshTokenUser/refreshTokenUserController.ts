import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refreshTokenUserUseCase";

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;
    if(!refresh_token) {
      throw new Error("Token not found")
    }

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
    const token = await refreshTokenUserUseCase.execute(refresh_token);

    return response.json(token)
  }
}

export {RefreshTokenUserController}
