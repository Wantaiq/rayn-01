export interface IProcessEnv {
  JWT_SECRET: string;
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
