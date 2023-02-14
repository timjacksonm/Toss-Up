export interface IToken {
  type?: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}
