import { ObjectId } from 'mongodb';

export interface TestData {
  _id: ObjectId;
  fullplot?: string;
  imdb?: { rating?: number; votes?: number; id?: number };
  title: string;
}
