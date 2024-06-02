import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { ResponseError, tryCatch } from '../utils';

const handleInputErrors: RequestHandler = tryCatch(
  (req, _res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError(400, 'Invalid input.', 400);
    }

    next();
  },
);

export default handleInputErrors;
