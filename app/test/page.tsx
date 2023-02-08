'use client';
// can't use topic manager due to being a server only function
// import TopicManager from 'lib/mongodb/TopicManager';

export default async function Page() {
  // const data = await TopicManager.getData();
  return <h1>Hello, Next.js!</h1>;
}
