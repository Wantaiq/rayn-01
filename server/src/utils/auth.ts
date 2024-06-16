import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import ResponseError from './ResponseError';

const generateAccessTokens = async (
  user: Pick<User, 'username' | 'id'>,
) => {
  const { id, username } = user;
  const accessToken = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
  );

  const refreshToken = jwt.sign(
    { id },
    process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION },
  );

  return { accessToken, refreshToken };
};

const verifyAccessToken = async (token: string) => {
  const user = jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET as Secret,
    (err, _) => {
      if (err) {
        throw new ResponseError(403, 'Invalid token', 403);
      }
    },
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
  generateAccessTokens,
  verifyAccessToken,
  hashPassword,
  comparePasswords,
};
