import Link from 'next/link';

export default async function DashboardHome() {
  return (
    <div>
      <div className="text-5xl text-green-400">Welcome to my the dashboard</div>

      <Link className="text-5xl text-yellow-200" href="/">
        Return to home
      </Link>
    </div>
  );
}
