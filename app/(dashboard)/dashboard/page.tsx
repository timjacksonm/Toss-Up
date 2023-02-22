import { redirect } from 'next/navigation';
import Link from 'next/link';
import UserCard from './user-card';
import { getCurrentUser } from 'utils/session';
import { pages } from 'utils/pages';
import { UserAvatar } from 'components/dashboard/avatar';

export default async function DashboardHome() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(pages.login);
  }

  return (
    <div>
      <div className='text-5xl text-green-400'>Welcome to my the dashboard</div>
      <UserAvatar user={user} />
      <UserCard />
      <Link className='text-5xl text-yellow-200' href='/'>
        Return to home
      </Link>
    </div>
  );
}
