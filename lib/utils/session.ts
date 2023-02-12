import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
