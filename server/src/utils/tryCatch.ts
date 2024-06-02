import {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from 'express';

const tryCatch =
  (controller: RequestHandler) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default tryCatch;
