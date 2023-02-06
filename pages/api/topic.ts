import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/utils/database';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  const { query, method } = req;

  switch (method) {
    case 'GET':
      const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();

      res.status(200).json(movies);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
