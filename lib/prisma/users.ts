import { prisma } from 'lib/prisma/prisma';
import bcrypt from 'bcrypt';
import { IUserCreate } from 'lib/types/IUserCreate';
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
          existingName: existingName?.username,
          existingEmail: existingEmail?.email,
        },
      };

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const newUser = { username, email, password: hashedPassword };

    const createdUser = await prisma.user.create({
      data: {
        ...newUser,
        emailVerified: false,
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

const checkUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
      },
      select: {
        password: true,
        emailVerified: true,
      },
    });

    if (!user) return false;

    // if (user?.emailVerified === false) return null; TODO: #47 Setup BE to send email to confirm signup

    const { password: passwordHash } = user;
    const result = await bcrypt.compare(password, passwordHash!);
    return result;
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to verify user credentials',
      stack: error,
    };
  }
};

const Users = { findUser, findAllUsers, updateUser, createUser, checkUser };
export { Users };
