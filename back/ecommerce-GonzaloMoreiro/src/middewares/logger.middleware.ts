import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Se ejecuto un método ${req.method} en la ruta ${req.url}`);
    next();
  }
}
const date = new Date(' ');
export const loggerGlobal = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    `Se ejecuto un método ${req.method} en la ruta ${req.url}`,
    'en la fecha',
    date,
  );

  next();
};
