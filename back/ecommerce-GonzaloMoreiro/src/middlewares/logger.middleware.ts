import { NextFunction, Request, Response } from 'express';

const date = new Date().toLocaleString();
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
