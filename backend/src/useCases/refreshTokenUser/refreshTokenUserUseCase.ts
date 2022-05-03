import {client} from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";
import dayjs from "dayjs"


class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      }
    });

    if(!refreshToken) {
      throw new Error("Token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if(refreshTokenExpired) {
      // const generateRefreshTokenProvider = new GenerateRefreshToken();
      // const refreshToken = await generateRefreshToken.execute(refreshToken.id)
      throw new Error("Token expired")
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    return { token }
  }
}


export {RefreshTokenUserUseCase}
