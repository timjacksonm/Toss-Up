import { redirect } from 'next/navigation';
import Link from 'next/link';
import UserCard from './user-card';
import { getCurrentUser } from 'utils/session';
import { pages } from 'utils/pages';

export default async function DashboardHome() {
  const user = getCurrentUser();

  if (!user) {
    redirect(pages.signIn);
  }

  return (
    <div>
      <div className="text-5xl text-green-400">Welcome to my the dashboard</div>
      <UserCard />
      <Link className="text-5xl text-yellow-200" href="/">
        Return to home
      </Link>
    </div>
  );
}
