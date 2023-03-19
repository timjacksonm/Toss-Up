import { Session } from 'next-auth';

export interface SessionExtended extends Session {
  user: {
    id?: string;
    email: string;
    username?: string;
    initials?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    image?: string | null;
    createdAt?: string;
    lastModified?: string;
  };
}
