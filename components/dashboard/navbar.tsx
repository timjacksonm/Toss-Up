'use client';
import { UserAvatar } from './UserAvatar';

export function NavBar() {
  return (
    <div className='float-right flex justify-end'>
      <UserAvatar />
    </div>
  );
}
