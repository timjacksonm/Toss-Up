import { GoogleProfile } from 'next-auth/providers/google';
import client from 'utils/mongoclient';
import { Tokens } from './Token';

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

const dbName = process.env.DB_NAME;
const collectionName = 'users';

const database = client.db(dbName);
const collection = database.collection(collectionName);

export const Users = {
  findOne: async (params) => {
    const { email } = params;
    const user = await collection.findOne({ email: email });

    return user;
  },
  getUsers: async () => {
    //too be added
  },
  createUserProfile: async ({ account, profile }) => {
    // saver token from provider and reference
    const { insertedId: tokenId } = await Tokens.saveProviderToken(account);

    if (!tokenId) {
      throw new Error('token creation failed');
    }

    const {
      email,
      given_name: firstName,
      family_name: lastName,
      name: fullName,
      picture,
    } = profile;
    const created = await collection.insertOne({
      email,
      firstName,
      lastName,
      fullName,
      picture,
      token: tokenId.toString(),
      createdAt: Date.now(),
      lastModified: Date.now(),
    });
    return created;
  },
  updateUserProfile: async () => {
    //too be added
  },
  deleteUser: async () => {
    //too be added
  },
};
