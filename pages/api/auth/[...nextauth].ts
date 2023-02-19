import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from 'lib/prisma/prisma';
import { Users } from 'lib/prisma/users';
import { ProfileExtended } from 'lib/types/IProfile';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const { email_verified, email, given_name, family_name } =
        profile as ProfileExtended;

      const user = await Users.findOne(email);

      if (user && email_verified && email) {
        const AuthProfile = profile as ProfileExtended;
        await Users.updateUser(AuthProfile);
        return true;
      }
      return false;
    },
  },
};

export default NextAuth(authOptions);
