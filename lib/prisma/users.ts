import { prisma } from 'lib/prisma/prisma';
import { ProfileExtended } from 'lib/types/IProfile';
import bcrypt from 'bcrypt';
import { IUserRequest } from 'lib/types/IUserRequest';

const findUser = async ({ email, name }: { email: string; name?: string }) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        { name },
      ],
    },
  });
};

const updateUser = async ({
  email,
  email_verified,
  given_name,
  family_name,
}: ProfileExtended) => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: email_verified,
      firstName: given_name,
      lastName: family_name,
    },
  });
};

const createUser = async (user: IUserRequest) => {
  const { email, username } = user;

  const existingUser = await findUser({ email, name: username });

  if (existingUser) return null;

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

const Users = { findUser, updateUser, createUser };
export { Users };
