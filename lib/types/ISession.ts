import { Session } from 'next-auth';

export interface SessionExtended extends Session {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    name?: string | null;
    email?: string | null;
  };
}
