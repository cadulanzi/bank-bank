import { Request, Response } from 'express';
import { HttpError } from '@utils/httpError';

export const errorHandler = (err: Error | HttpError, req: Request, res: Response) => {
  console.error(err.message);

  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
};