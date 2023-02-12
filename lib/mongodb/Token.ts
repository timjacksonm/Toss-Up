import client from 'utils/mongoclient';

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

const dbName = process.env.DB_NAME;
const collectionName = 'tokens';

const database = client.db(dbName);
const collection = database.collection(collectionName);

export const Tokens = {
  async validateToken(tokenId) {
    //too be added
  },
  async saveProviderToken(account) {
    const {
      provider,
      type,
      providerAccountId,
      access_token,
      expires_at,
      token_type,
      id_token: token,
    } = account;

    const document = await collection.insertOne({
      provider,
      type,
      providerAccountId,
      access_token,
      expires_at,
      token_type,
      token,
      createdAt: Date.now(),
    });

    return document;
  },
};
