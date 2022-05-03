import {client} from "../../prisma/client";

class GetUserUseCase {
  async execute(userId, auth) {
    console.log("UseCase: ", userId)
    const token = await client.refreshToken.findFirst({
      where: {
        id: userId,
      }
    });
    const samePermission = await client.bearer.findFirst({
      where: {
        bearer: auth,
      }
    });

    if(samePermission.userId == token.userId) {
      const user = await client.user.findFirst({
        where: {
          id: token.userId,
        }
      });

      if(!user) {
        throw new Error('user not found');
      }
      const removeProp = 'password'
      const {[removeProp]: remove, ...res} = user
      return res
    }
    throw new Error('user not found')
  }
}


export {GetUserUseCase}
