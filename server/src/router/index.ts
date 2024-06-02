import Router from 'express';
import authRoutes from './auth';
import { errorHandler } from '../middlewares';

const router = Router();
router.use('/auth', authRoutes);

router.use(errorHandler);

export default router;
