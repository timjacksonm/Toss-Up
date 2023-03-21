// This is a server only file and cannot be used within pages / app directory
// Mostly because of bcrypt being a server only package since it uses the nodejs file system
import { prisma } from 'lib/prisma/prisma';
import { IUserCreate } from 'lib/types/IUserCreate';
import { Users } from './users';
import bcrypt from 'bcrypt';

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

const createUser = async (user: IUserCreate) => {
  try {
    const { email, username } = user;

    const [existingName, existingEmail] = await Promise.all([
      Users.findUser(username),
      Users.findUser(email),
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
  } catch (error) {
    throw {
      message: 'Internal server error: Failed to create user',
      stack: error,
    };
  }
};

const checkUser = async ({ username, password }: { username: string; password: string }) => {
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
    if (passwordHash) {
      const result = await bcrypt.compare(password, passwordHash);
      return result;
    }
  } catch (error) {
    throw {
      message: 'Internal server error: Failed to verify user credentials',
      stack: error,
    };
  }
};

const ServerOnly = { Users: { ...Users, checkUser, createUser } };
export { ServerOnly };
