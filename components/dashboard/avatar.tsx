'use client';
import * as Avatar from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';

interface AvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}

export function UserAvatar({
  user: { image, firstName, lastName },
}: {
  user: AvatarProps;
}) {
  const [initials, setInitials] = useState<string>();

  useEffect(() => {
    if (firstName && lastName) {
      const uppercase = (
        firstName.charAt(0) + lastName.charAt(0)
      ).toUpperCase();
      setInitials(uppercase);
    }
  }, [firstName, lastName]);
  return (
    <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={image ?? undefined}
      />
      <Avatar.Fallback className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
        {initials}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
