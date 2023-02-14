import { Users } from 'lib/mongodb/Users';
import { IProfileExtended } from 'lib/types/IProfileExtended';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    async signIn({ account, profile: OauthProfile }) {
      if (account?.type === 'oauth')
        switch (account?.provider) {
          case 'google':
            const profile = OauthProfile as IProfileExtended;
            const { email_verified } = profile;
            if (!email_verified) {
              return false;
            }
            // Note: probably not correct to use direct db calls here and should use api calls to db. This is the client side still.
            // when nextjs switches the api folder under app I should add "server-only" at top of mongodb query file.
            //change to upsert?
            const user = await Users.findOne(profile);
            if (user) {
              //probably add some sort of token validation here by quering the db
              return true;
            }
            //if no user profile found create one
            const created = await Users.createProfileFromProvider({
              account,
              profile,
            });
            if (created) {
              return true;
            } else {
              return false;
            }

            break;

          default:
            break;
        }
      if (account?.type === 'email') {
        //too be added
        return true;
      }
      if (account?.type === 'credentials') {
        //too be added
        return true;
      }

      return false; // Default sends to error.tsx page
    },
  },
};

export default NextAuth(authOptions);
