import { prisma } from 'lib/prisma/prisma';
import { IUserUpdates } from 'lib/types/IUserUpdates';
import { isValidObjectId } from 'utils/isValidObjectId';

/**
 * A safe and limited selection of fields to include in a Prisma query response.
 * Suitable for returning non-sensitive data without exposing unnecessary information.
 */
const select = {
  id: true,
  username: true,
  email: true,
  name: true,
  firstName: true,
  lastName: true,
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
            email: {
              contains: identifier,
              mode: 'insensitive',
            },
          },
          {
            username: {
              contains: identifier,
              mode: 'insensitive',
            },
          },
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
        username: true,
        email: true,
        name: true,
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

const Users = { findUser, findAllUsers, updateUser };
export { Users };
