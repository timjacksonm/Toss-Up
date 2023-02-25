import { prisma } from 'lib/prisma/prisma';
import bcrypt from 'bcrypt';
import { IUserRequest } from 'lib/types/IUserRequest';
import { IUserUpdates } from 'lib/types/IUserUpdates';

const findUser = async (identifier: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: identifier,
        },
        {
          email: identifier,
        },
        { name: identifier },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

const findAllUsers = async (email?: string) => {
  return await prisma.user.findMany({
    where: {
      ...(email ? { email } : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
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

const createUser = async (user: IUserRequest) => {
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
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  return createdUser;
};

const Users = { findUser, findAllUsers, updateUser, createUser };
export { Users };
