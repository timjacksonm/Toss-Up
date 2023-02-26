import { prisma } from 'lib/prisma/prisma';
import bcrypt from 'bcrypt';
import { IUserCreate } from 'lib/types/IUserCreate';
import { IUserUpdates } from 'lib/types/IUserUpdates';
import { isValidObjectId } from 'utils/isValidObjectId';
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
  try {
    if (isValidObjectId(identifier)) {
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
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to find user',
      stack: error,
    };
  }
};

const findAllUsers = async (email?: string) => {
  try {
    return await prisma.user.findMany({
      where: {
        ...(email ? { email } : {}),
      },
      select: select,
    });
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to find all users',
      stack: error,
    };
  }
};

const updateUser = async (id: string, updates: IUserUpdates) => {
  try {
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
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to update user',
      stack: error,
    };
  }
};

const createUser = async (user: IUserCreate) => {
  try {
    const { email, username } = user;

    const [existingName, existingEmail] = await Promise.all([
      findUser(username),
      findUser(email),
    ]);

    if (existingName || existingEmail)
      return {
        errors: {
          existingName: existingName?.name,
          existingEmail: existingEmail?.email,
        },
      };

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const newUser = { name: username, email, password: hashedPassword };

    const createdUser = await prisma.user.create({
      data: {
        ...newUser,
      },
      select: select,
    });
    return { user: createdUser };
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to create user',
      stack: error,
    };
  }
};

const Users = { findUser, findAllUsers, updateUser, createUser };
export { Users };
