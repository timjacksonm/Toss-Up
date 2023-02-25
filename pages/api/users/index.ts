import { Users } from 'lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    if (method === 'GET') {
      const users = await Users.findAllUsers();

      if (users) return res.status(200).json(users);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
