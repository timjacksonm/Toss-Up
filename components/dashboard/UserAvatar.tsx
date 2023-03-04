'use client';
import { signOut, useSession } from 'next-auth/react';
import { SessionExtended } from 'lib/types/ISession';
import { Avatar, Dropdown } from 'flowbite-react';
import { pages } from 'utils/pages';

export function UserAvatar() {
  const { data: session, status } = useSession();

  if (!session && status === 'loading') return null;

  const { user } = session as SessionExtended;

  return (
    <Dropdown
      label={
        <Avatar
          status='online'
          alt='User settings'
          img={user.image}
          rounded={true}
          size='md'
          placeholderInitials={user.initials}
        />
      }
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className='block text-sm'>{user.name}</span>
        <span className='block truncate text-sm font-medium'>{user.email}</span>
      </Dropdown.Header>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Leaderboards</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
        <button onClick={() => signOut({ callbackUrl: pages.home })}>
          Sign out
        </button>
      </Dropdown.Item>
    </Dropdown>
  );
}
