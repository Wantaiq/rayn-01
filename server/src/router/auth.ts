import { Router } from 'express';
import { tryCatch } from '../utils';
import {
  login,
  refreshToken,
  register,
} from '../controllers';
import { handleInputErrors } from '../middlewares';
import { authSchema } from '../schemas';
import { checkSchema } from 'express-validator';

const authRoutes: Router = Router();

authRoutes.post(
  '/register',
  checkSchema(authSchema),
  handleInputErrors,
  tryCatch(register),
);

authRoutes.post(
  '/login',
  checkSchema(authSchema),
  handleInputErrors,
  tryCatch(login),
);

authRoutes.get('/refresh', tryCatch(refreshToken));
export default authRoutes;
