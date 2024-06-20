import { Prisma } from '@prisma/client';
import prisma from '../utils/db';
import { hashPassword } from '../utils/auth';

async function createNewUser(
  username: Prisma.UserCreateInput['username'],
  password: Prisma.UserCreateInput['password'],
) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: await hashPassword(password),
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
}

async function getUserByUsername(
  username: Prisma.UserFindUniqueArgs['where']['username'],
) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}

async function getUserByRefreshToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      tokens: {
        has: token,
      },
    },
    select: {
      id: true,
      username: true,
      tokens: true,
    },
  });

  return user;
}

async function clearRefreshTokens(
  id: Prisma.UserUpdateArgs['where']['id'],
) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      tokens: [],
    },
    select: {
      username: true,
      id: true,
    },
  });

  return user;
}

async function setRefreshTokens(
  id: Prisma.UserUpdateArgs['where']['id'],
  refreshTokens: string[],
) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      tokens: refreshTokens,
    },
    select: {
      username: true,
      id: true,
      tokens: true,
    },
  });

  return user;
}

export {
  createNewUser,
  getUserByUsername,
  getUserByRefreshToken,
  clearRefreshTokens,
  setRefreshTokens,
};
