import { Profile } from 'next-auth';

export interface IProfileExtended extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  hd: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  sub: string;
}
