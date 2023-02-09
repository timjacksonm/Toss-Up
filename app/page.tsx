import { getData } from 'lib/mongodb/Topics';
import Image from 'next/image';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <div className="flex">
        <h1>
          Adventure
          <Image src={img1} alt={'asdf'} />
        </h1>
        <h1>
          Fantasy
          <Image src={img2} alt={'asdf1'} />
        </h1>
        <h1>
          {' '}
          Animals
          <Image src={img3} alt={'asdf2'} />
        </h1>
        <h1>
          {' '}
          Travel
          <Image src={img4} alt={'asdf3'} />
        </h1>
      </div>
      {data ? (
        data.map(({ _id, question, answered, thumbsDown, thumbsUp, topic }) => (
          <div key={_id}>
            <h1>{`Topic: ${topic}`}</h1>
            <p className="text-blue-300">{question}</p>
            <p className="text-purple-300">{`answered: ${answered} upvote: ${thumbsUp} downvote: ${thumbsDown}`}</p>
          </div>
        ))
      ) : (
        <div>{'false'}</div>
      )}
    </div>
  );
}
