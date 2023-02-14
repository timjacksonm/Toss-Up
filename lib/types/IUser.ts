import { ITokenRef } from './ITokenRef';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
  tokens: [ITokenRef];
  createdAt: Date;
  lastModified: Date;
}
