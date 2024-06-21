import express, { Express } from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';
import helmet from 'helmet';

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandler);
export default app;
