import express, { Express } from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandler);
export default app;
