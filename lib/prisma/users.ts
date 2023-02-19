import { prisma } from 'lib/prisma/prisma';
import { ProfileExtended } from 'lib/types/IProfile';

export const Users = {
  findOne: async (email?: string, id?: string) => {
    return await prisma.user.findUnique({
      where: {
        ...(email ? { email: email } : {}),
        ...(id ? { id: id } : {}),
      },
    });
  },
  updateUser: async ({
    email,
    email_verified,
    given_name,
    family_name,
  }: ProfileExtended) => {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        emailVerified: email_verified,
        firstName: given_name,
        lastName: family_name,
      },
    });
  },
};
