import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  // if(request.params.id){
  //   const {refresh_token} = request.body
  //   console.log("Auth: " ,refresh_token)
  //   request.headers.token = refresh_token;
  // }

  if(!authToken) {
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  // Remove "Bearer"
  const [, token] = authToken.split(" ");

  // verify token
  const secret_key = process.env.SECRET_KEY
  try {
    verify(token, secret_key)
    return next();
  } catch(err) {
    return response.status(401).json({
      message: "Invalid token"
    })
  }
}
