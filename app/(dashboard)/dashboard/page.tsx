import { redirect } from 'next/navigation';

import { getCurrentUser } from 'utils/session';
import { pages } from 'utils/pages';
import { NavBar } from 'components/dashboard/navbar';
import Image from 'next/image';
import { TopicCard } from 'components/dashboard/TopicCard';

export default async function DashboardHome() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(pages.signin);
  }

  const TopicPlaceholders = {
    Topic1: {
      cardTitle: 'Fantasy',
      imgSrc: '/img2.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
    Topic2: {
      cardTitle: 'Animals',
      imgSrc: '/img3.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
    Topic3: {
      cardTitle: 'Travel',
      imgSrc: '/img4.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
    Topic4: {
      cardTitle: 'Books',
      imgSrc: '/img10.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
    Topic5: {
      cardTitle: 'Entertainment',
      imgSrc: '/img7.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
    Topic6: {
      cardTitle: 'Science',
      imgSrc: '/img5.png',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum, possimus minima consequatur?',
    },
  };

  return (
    <div>
      <NavBar />
      <main className='flex justify-center p-20'>
        <div className='grid grid-cols-3 gap-4'>
          <TopicCard {...TopicPlaceholders.Topic1} />
          <TopicCard {...TopicPlaceholders.Topic2} />
          <TopicCard {...TopicPlaceholders.Topic3} />
          <TopicCard {...TopicPlaceholders.Topic4} />
          <TopicCard {...TopicPlaceholders.Topic5} />
          <TopicCard {...TopicPlaceholders.Topic6} />
        </div>
      </main>
    </div>
  );
}
