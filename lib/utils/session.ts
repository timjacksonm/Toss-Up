import { SessionExtended } from 'lib/types/ISession';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export async function getCurrentUser() {
  const session: SessionExtended | null = await getServerSession(authOptions);
  return session?.user;
}
