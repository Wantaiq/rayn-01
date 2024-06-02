import {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { ResponseError } from '../utils';

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ResponseError) {
    res.status(err.statusCode);
    res.json({
      errorCode: err.errorCode,
      message: err.message,
    });

    return;
  }

  res.status(500);
  res.json({
    message: 'Something went wrong.',
  });

  return;
};

export default errorHandler;
