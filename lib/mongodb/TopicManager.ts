import 'server-only';
import { TestData } from 'lib/types/ITopic';
import { Collection } from 'mongodb';
import clientPromise from '../utils/database';

class TopicManager {
  private collection!: Collection;
  constructor() {
    this.connect();
  }

  async connect() {
    const client = await clientPromise;
    const database = client.db('sample_mflix');
    this.collection = database.collection('movies');
  }

  async getData() {
    const movies = await this.collection
      .find<TestData>({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    return movies;
  }
}

const instance = new TopicManager();
export default instance;
