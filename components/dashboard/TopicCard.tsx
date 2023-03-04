import { Icons } from 'components/Icons/icons';
import Image from 'next/image';

interface TopicCardProps {
  cardTitle: string;
  imgSrc: string;
  description: string;
}

export function TopicCard({ cardTitle, imgSrc, description }: TopicCardProps) {
  return (
    <div className='max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
      <Image
        className='rounded-t-lg'
        src={imgSrc}
        alt=''
        width={400}
        height={400}
      />
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {cardTitle}
        </h5>

        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {description}
        </p>
        <a
          href='#'
          className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Continue
          <Icons.chevronRight className='ml-2 -mr-1 h-5 w-5' />
        </a>
      </div>
    </div>
  );
}
