import { InsertOneResult, WithId } from 'mongodb';
import { Account } from 'next-auth';
import { IProfileExtended } from './IProfileExtended';
import { IUser } from './IUser';

export interface IUsers {
  findOne: (params: any) => Promise<WithId<IUser> | null>;
  findOneAndUpdate: () => any;
  getUsers: () => any;
  createProfileFromProvider: ({
    account,
    profile,
  }: {
    account: Account;
    profile: IProfileExtended;
  }) => Promise<InsertOneResult<IUser>>;
  updateUserProfile: () => any;
  deleteUser: () => any;
}
