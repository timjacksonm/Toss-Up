import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
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
      const { email_verified } = profile as GoogleProfile;
      if (account?.provider === 'google' && email_verified) {
        return true;
      }
      return false; // Currently sends to error.tsx page
    },
  },
};

export default NextAuth(authOptions);
