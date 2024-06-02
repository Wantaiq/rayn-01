import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ResponseError } from '../utils';

const handleInputErrors = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError(400, 'Invalid input.', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default handleInputErrors;
