'use client';
import { UserAvatar } from './dashboard/UserAvatar';

export function NavBar() {
  return (
    <div className='float-right flex justify-end'>
      <UserAvatar />
    </div>
  );
}
