import { ObjectId } from 'mongodb';

export interface ITokenRef {
  _id: ObjectId;
  type: string;
  provider?: {
    name: string;
    providerAccountId?: string;
  };
  createdAt: Date;
  expiresAt: Date;
}
