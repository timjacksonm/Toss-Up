import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex h-64 flex-col justify-between">
      <div className="text-5xl text-green-400">
        Welcome to my amazing website
      </div>
      <Link className="text-5xl text-yellow-200" href="/login">
        Login Page
      </Link>
      <Link className="text-5xl text-yellow-200" href="/register">
        Register Page
      </Link>
    </div>
  );
}
