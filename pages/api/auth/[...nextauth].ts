import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from 'lib/prisma/prisma';
import { Users } from 'lib/prisma/users';
import { ProfileExtended } from 'lib/types/IProfile';
import { SessionExtended } from 'lib/types/ISession';

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

      const user = await Users.findUser({ email });

      if (email_verified) {
        if (user) {
          const AuthProfile = profile as ProfileExtended;
          await Users.updateUser(AuthProfile);
        }
        return true;
      }
      return false;
    },
    async session({ session, user: { email } }) {
      const updatedSession = session as SessionExtended;
      if (email) {
        const user = await Users.findUser({ email });
        updatedSession.user = {
          ...session.user,
          firstName: user?.firstName,
          lastName: user?.lastName,
          image: user?.image,
        };
      }
      return updatedSession;
    },
  },
};

export default NextAuth(authOptions);
