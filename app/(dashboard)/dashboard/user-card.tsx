'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Client() {
  const { data: session, status } = useSession();

  return (
    <div>
      <p>{session?.user?.email}</p>
      <p>{status}</p>
      <button onClick={() => signOut()}>sign out</button>
    </div>
  );
}
