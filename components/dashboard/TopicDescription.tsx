'use client';
import { useState } from 'react';

export function TopicDescription({
  description,
}: {
  description: string | null;
}) {
  const [isExapnded, setIsExpanded] = useState(false);

  if (!description) return <p>not available</p>;

  return (
    <p
      className={`${
        isExapnded && 'max-h-24 overflow-y-scroll'
      } flex flex-col font-normal text-gray-700 dark:text-gray-400`}
    >
      {description.length <= 100 && description}
      {description.length > 100 && (
        <>
          {isExapnded ? description : `${description.slice(0, 100)}...`}
          <button
            className='flex w-20 text-blue-600'
            onClick={() => setIsExpanded(!isExapnded)}
          >
            {isExapnded ? 'Read less' : 'Read more'}
          </button>
        </>
      )}
    </p>
  );
}
