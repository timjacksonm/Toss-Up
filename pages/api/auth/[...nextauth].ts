import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from 'lib/prisma/prisma';
import { ProfileExtended } from 'lib/types/IProfile';
import { SessionExtended } from 'lib/types/ISession';
import { CustomError } from 'lib/types/CustomError';
import { IUser } from 'lib/types/IUser';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/signin/verify`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const { error, user } = (await res.json()) as {
          error: CustomError;
          user: IUser;
        };
        if (error) {
          throw new Error(error.message);
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // No extra handling if signin with credentials. Already handled in CredentialsProvider above.
      if (account?.type === 'credentials') {
        return true;
      }
      const { email_verified, email } = profile as ProfileExtended;
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/users?email=${email}`);
      const [user] = (await res.json()) as IUser[];
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
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/users/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdates),
          });
          return true;
        }
        return true;
      }
      return false;
    },
    async session({ session }) {
      const updatedSession = {} as SessionExtended;
      if (session.user?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/users?email=${session.user?.email}`
        );
        const [user] = (await res.json()) as IUser[];
        let initials;
        if (user.firstName && user.lastName) {
          initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
        }

        if (user) {
          updatedSession.user = {
            ...session.user,
            ...user,
            initials,
          };
        }
      }
      return updatedSession;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
