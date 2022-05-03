import {client} from "../prisma/client"
import dayjs from "dayjs"

class GenerateRefreshToken {
  async execute(userId: string) {

    // criando um novo token
    //const expiresIn = dayjs().add(15, "second").unix()
    const expiresIn = 60 * 60 * 2
    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken
  }
}

export {GenerateRefreshToken}
