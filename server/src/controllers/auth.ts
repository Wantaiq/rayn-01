import { RequestHandler } from 'express';
import {
  clearRefreshTokens,
  createNewUser,
  getUserByRefreshToken,
  getUserByUsername,
  setRefreshTokens,
} from '../services';
import {
  comparePasswords,
  generateAccessTokens,
  ResponseError,
} from '../utils';
import jwt, { Secret } from 'jsonwebtoken';

const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    throw new ResponseError(
      409,
      'Username already in use.',
      409,
    );
  }

  const newUser = await createNewUser(username, password);

  res.json({
    message: 'Successfully created user.',
    id: newUser.id,
    username: newUser.username,
  });
  return;
};

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);

  if (!user) {
    throw new ResponseError(
      404,
      'Username not found.',
      404,
    );
  }

  const isValid = await comparePasswords(
    password,
    user.password,
  );

  if (!isValid) {
    throw new ResponseError(
      401,
      'Invalid username or password.',
      401,
    );
  }

  const existingRefreshTokens = req.cookies?.jwt
    ? user.tokens.filter(
        (token) => token !== req.cookies.jwt,
      )
    : user.tokens;

  if (req.cookies?.jwt) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }

  const { accessToken, refreshToken } =
    await generateAccessTokens(user);

  await setRefreshTokens(user.id, [
    ...existingRefreshTokens,
    refreshToken,
  ]);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({
    token: accessToken,
    id: user.id,
    username: user.username,
  });

  return;
};

const logout: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(204);
    res.json({ message: 'Logged out' });
    return;
  }

  const refreshToken = cookies?.jwt;

  const user = await getUserByRefreshToken(refreshToken);
  if (user) {
    const newUserRefreshTokens = user.tokens.filter(
      (token) => token !== refreshToken,
    );

    await setRefreshTokens(user.id, newUserRefreshTokens);
  }

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  res.status(204);
  res.json({ message: 'Logged out' });
};

const refreshToken: RequestHandler = async (
  req,
  res,
  next,
) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new ResponseError(
      401,
      'Cookie does not exist.',
      401,
    );
  }

  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  const user = await getUserByRefreshToken(refreshToken);
  const newUserRefreshTokens = user
    ? user.tokens.filter((token) => token !== refreshToken)
    : [];

  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
      async (err: any, decoded: any) => {
        try {
          if (err) {
            throw new ResponseError(
              403,
              'Invalid refresh token.',
              403,
            );
          }
          await clearRefreshTokens(decoded.id);
          throw new ResponseError(
            403,
            'Invalid refresh token.',
            403,
          );
        } catch (error) {
          next(error);
        }
      },
    );
  } else {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
      async (err: any, decoded: any) => {
        try {
          if (err) {
            await setRefreshTokens(user.id, [
              ...newUserRefreshTokens,
            ]);

            throw new ResponseError(
              403,
              'Invalid refresh token.',
              403,
            );
          }
          if (user.id !== decoded.id) {
            throw new ResponseError(
              403,
              'Invalid refresh token.',
              403,
            );
          }

          const newTokens = await generateAccessTokens(
            user,
          );
          await setRefreshTokens(user.id, [
            ...newUserRefreshTokens,
            newTokens.refreshToken,
          ]);

          res.cookie('jwt', newTokens.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.json({
            token: newTokens.accessToken,
            id: user.id,
            username: user.id,
          });
        } catch (error) {
          next(error);
        }
      },
    );
  }
};

export { register, login, logout, refreshToken };
