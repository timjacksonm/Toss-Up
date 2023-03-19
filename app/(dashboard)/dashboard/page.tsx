import { redirect } from 'next/navigation';
import { getCurrentUser } from 'utils/session';
import { pages } from 'utils/pages';
import { NavBar } from 'components/dashboard/navbar';
import { TopicCard } from 'components/dashboard/TopicCard';
import { Topics } from 'lib/prisma/managers';

export default async function DashboardHome() {
  const user = await getCurrentUser();

  console.log(user);

  if (!user) {
    redirect(pages.signin);
  }

  const topics = await Topics.findAllTopics();

  return (
    <div>
      <NavBar />
      <main className='flex justify-center p-20'>
        <div className='grid grid-cols-3 gap-4'>
          {topics.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
