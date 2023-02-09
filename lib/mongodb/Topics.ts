import 'server-only';
import { TestData } from 'lib/types/ITopic';
import client from 'utils/mongoclient';

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}
if (!process.env.COLLECTION_NAME) {
  throw new Error('Invalid/Missing environment variable: "COLLECTION_NAME"');
}

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const database = client.db(dbName);
const collection = database.collection(collectionName);

export async function getData() {
  const questions = await collection
    .find<TestData>({ topic: 'animals' })
    .limit(10)
    .toArray();

  return questions;
}
