import { prisma } from 'lib/prisma/prisma';
import { ProfileExtended } from 'lib/types/IProfile';

const findOne = async (email: string | undefined) => {
  return await prisma.user.findUnique({
    where: {
      email,
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

const Users = { findOne, updateUser };
export { Users };
