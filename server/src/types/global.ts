import { Secret } from 'jsonwebtoken';

export interface IProcessEnv {
  JWT_ACCESS_TOKEN_SECRET: Secret;
  JWT_REFRESH_TOKEN_SECRET: Secret;
  JWT_ACCESS_TOKEN_DURATION: string;
  JWT_REFRESH_TOKEN_DURATION: string;
  DATABASE_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }

  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
