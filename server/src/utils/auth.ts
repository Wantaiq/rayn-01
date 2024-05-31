import jwt from 'jsonwebtoken';
import type { User } from '../types/user';
import bcrypt from 'bcrypt';

const createJWT = (user: User) => {
  const { id, username } = user;
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET as string,
  );

  return token;
};

const verifyJWT = (token: string) => {
  const user = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  );
  return user;
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

const comparePasswords = (
  password: string,
  hash: string,
) => {
  return bcrypt.compare(password, hash);
};

export {
  createJWT,
  verifyJWT,
  hashPassword,
  comparePasswords,
};
