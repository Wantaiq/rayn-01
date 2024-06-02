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

export { createNewUser, getUserByUsername };
