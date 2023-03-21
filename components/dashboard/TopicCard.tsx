import { Icons } from 'components/Icons/icons';
import Image from 'next/image';
import { TopicDescription } from './TopicDescription';

interface TopicCardProps {
  title: string;
  imgUrl: string;
  description: string;
  questionCount: number;
}

export function TopicCard({ title, imgUrl, description, questionCount }: TopicCardProps) {
  return (
    <div className='flex max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white pb-5 shadow dark:border-gray-700 dark:bg-gray-800'>
      <div>
        <Image className='rounded-t-lg' src={imgUrl} alt='' width={400} height={400} />
        <div className='p-5'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </h5>

          <TopicDescription {...{ description }} />
        </div>
      </div>
      <div className='flex justify-between px-5'>
        {/* TODO: Add in completion count in the future based on user records i.e. 25/1500 questions. Disable if completed */}
        <p className='flex items-center'>{`${questionCount} questions`}</p>
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
