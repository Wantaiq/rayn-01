import { RequestHandler } from 'express';
import {
  createNewUser,
  getUserByUsername,
} from '../services';
import {
  comparePasswords,
  createJWT,
  ResponseError,
} from '../utils';

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
  const token = createJWT(newUser);

  res.json({ token });
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

  const token = createJWT(user);
  res.json({ token });
  return;
};

export { register, login };
