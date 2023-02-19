import { Profile } from 'next-auth';

export interface ProfileExtended extends Profile {
  email_verified: boolean;
  given_name: string;
  family_name: string;
}
