import { IUser } from 'lib/types/IUser';
import client from 'utils/mongoclient';
import { Tokens } from './Token';
import { IUsers } from 'lib/types/IUsers';

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

const dbName = process.env.DB_NAME;
const collectionName = 'users';

const database = client.db(dbName);
const collection = database.collection<IUser>(collectionName);

export const Users: IUsers = {
  findOne: async (params) => {
    const { email } = params;
    const user = await collection.findOne({ email: email });

    return user;
  },
  findOneAndUpdate: async () => {
    //too be added
  },
  getUsers: async () => {
    //too be added
  },
  createProfileFromProvider: async ({ account, profile }) => {
    const { _id, createdAtDate, expiresAtDate } =
      await Tokens.saveProviderToken(account);

    if (!_id) {
      throw new Error('Saving token failed');
    }

    const { type, provider, providerAccountId } = account;
    const { email, given_name, family_name, name, picture } = profile;

    const created = await collection.insertOne({
      email,
      firstName: given_name!,
      lastName: family_name!,
      fullName: name,
      picture: picture!,
      tokens: [
        {
          _id: _id,
          type,
          provider: { name: provider, providerAccountId },
          createdAt: createdAtDate,
          expiresAt: expiresAtDate,
        },
      ],
      createdAt: new Date(Date.now()),
      lastModified: new Date(Date.now()),
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
