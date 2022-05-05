import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import cors from 'cors';
import { router } from "./routes";
import morgan from 'morgan'

const app = express();

morgan('tiny')
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(400).json({
    status: "Error",
    message: error.message,
  })
})
app.listen(3000, () => console.log("[INFO] Server running!"));
