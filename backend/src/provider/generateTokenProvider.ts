import { sign } from "jsonwebtoken";
import { client } from "../prisma/client";
// import daysjs from "dayjs";

class GenerateTokenProvider {
  async execute(userId: string) {
    const secret_key = process.env.SECRET_KEY
    const expiresIn = 60 * 60 * 1
    const token = sign({}, secret_key, {
      subject: userId,
      expiresIn: expiresIn,
    });
    if(token) {
    const generateBearerToken = await client.bearer.create({
      data: {
        bearer: token,
        userId,
        expiresIn,
      },
    });
      return generateBearerToken;
    }
  }
}

export {GenerateTokenProvider}
