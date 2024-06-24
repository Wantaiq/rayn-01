import express, { Express } from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';
import helmet from 'helmet';
import cors from 'cors';

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api', router);

app.use(errorHandler);

export default app;
