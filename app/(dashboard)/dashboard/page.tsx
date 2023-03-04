import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from 'utils/session';
import { pages } from 'utils/pages';
import { NavBar } from 'components/navbar';

export default async function DashboardHome() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(pages.signin);
  }

  return (
    <div>
      <NavBar />
      <Link className='text-5xl text-yellow-200' href='/'>
        Return to home
      </Link>
    </div>
  );
}
