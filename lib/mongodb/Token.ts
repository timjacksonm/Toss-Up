import { IToken } from 'lib/types/IToken';
import { Account } from 'next-auth';
import client from 'utils/mongoclient';

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

const dbName = process.env.DB_NAME;
const collectionName = 'tokens';

const database = client.db(dbName);
const collection = database.collection<IToken>(collectionName);

export const Tokens = {
  async validateToken(tokenId) {
    //too be added
  },
  async saveProviderToken({ expires_at, token_type, id_token }: Account) {
    const createdAtDate = new Date(Date.now());
    const expiresAtDate = new Date(expires_at! * 1000);
    const { insertedId: _id } = await collection.insertOne({
      type: token_type,
      token: id_token!,
      createdAt: createdAtDate,
      expiresAt: expiresAtDate,
    });

    return { _id, createdAtDate, expiresAtDate };
  },
};
