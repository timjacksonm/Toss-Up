'use client';
import { useSession, signOut } from 'next-auth/react';
import { pages } from 'utils/pages';

export default function Client() {
  const { data: session, status } = useSession();

  return (
    <div>
      <p>{session?.user?.email}</p>
      <p>{status}</p>
      <button onClick={() => signOut({ callbackUrl: pages.home })}>
        sign out
      </button>
    </div>
  );
}
