import { prisma } from 'lib/prisma/prisma';
import bcrypt from 'bcrypt';
import { IUserCreate } from 'lib/types/IUserCreate';
import { IUserUpdates } from 'lib/types/IUserUpdates';
import { ObjectId } from 'mongodb';

/**
 * A safe and limited selection of fields to include in a Prisma query response.
 * Suitable for returning non-sensitive data without exposing unnecessary information.
 */
const select = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  lastModified: true,
};

const findUser = async (identifier: string) => {
  if (ObjectId.isValid(identifier)) {
    return await prisma.user.findFirst({
      where: {
        id: identifier,
      },
      select: select,
    });
  }
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: identifier,
        },
        { name: identifier },
      ],
    },
    select: select,
  });
};

const findAllUsers = async (email?: string) => {
  return await prisma.user.findMany({
    where: {
      ...(email ? { email } : {}),
    },
    select: select,
  });
};

const updateUser = async (id: string, updates: IUserUpdates) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: updates,
    select: {
      id: true,
      name: true,
      email: true,
      firstName: true,
      lastName: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      lastModified: true,
    },
  });
};

const createUser = async (user: IUserCreate) => {
  const { email, username } = user;

  const [existingEmail, existingName] = await Promise.all([
    findUser(email),
    findUser(username),
  ]);

  if (existingEmail || existingName) return null;

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  const newUser = { name: username, email, password: hashedPassword };

  const createdUser = await prisma.user.create({
    data: {
      ...newUser,
    },
    select: select,
  });
  return createdUser;
};

const Users = { findUser, findAllUsers, updateUser, createUser };
export { Users };
