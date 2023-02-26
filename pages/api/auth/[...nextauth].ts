import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from 'lib/prisma/prisma';
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/users?email=${email}`
      );
      const [user] = await res.json();

      if (email_verified) {
        if (user) {
          const { id } = user;
          const AuthProfile = profile as ProfileExtended;
          const userUpdates = {
            email: AuthProfile?.email,
            firstName: AuthProfile?.given_name,
            lastName: AuthProfile?.family_name,
            emailVerified: AuthProfile?.email_verified,
          };
          // Update User
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdates),
          });
        }
        return true;
      }
      return false;
    },
    async session({ session, user: { email } }) {
      const updatedSession = session as SessionExtended;

      if (email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/users?email=${email}`
        );
        const [user] = await res.json();

        //only adding id & createdAt to session state from db
        if (user) {
          updatedSession.user = {
            ...session.user,
            ...user,
          };
        }
      }
      return updatedSession;
    },
  },
};

export default NextAuth(authOptions);
