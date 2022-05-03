import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/generateRefreshToken";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";


interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({username, password}: IRequest) {
    if(!username || !password) {
      throw new Error("User or passowrd incorrect");
    }
    // verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }

    //verificar se a senha está correta
    const passwordMatch = await compare(password, userAlreadyExists.password)
    if(!passwordMatch) {
      throw new Error("User or password incorrect");
    }
    // gerar token do usuário
    await client.bearer.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      }
    });

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userAlreadyExists.id)    

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      }
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    const removeProp = 'password'
    const {[removeProp]: remove, ...user} = userAlreadyExists
    
    return { token, refreshToken, user: user };
  }
}

export { AuthenticateUserUseCase }
