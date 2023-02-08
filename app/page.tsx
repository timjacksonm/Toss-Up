import TopicManager from 'lib/mongodb/TopicManager';
import clientPromise from 'lib/utils/database';

async function getConnection() {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default async function HomePage() {
  const connection = await getConnection();
  const data = await TopicManager.getData();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Some content</p>
      {data ? (
        data.map((stuff) => <div key={stuff._id.toString()}>{stuff.title}</div>)
      ) : (
        <div>{'false'}</div>
      )}
      {connection.props.isConnected ? (
        <h2 className="text-green-500">You are connected to MongoDB</h2>
      ) : (
        <h2 className="text-red-600">You are NOT connected to MongoDB.</h2>
      )}
    </div>
  );
}
