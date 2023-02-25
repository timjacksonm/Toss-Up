import { Users } from 'lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';

const idSchema = Joi.string().length(24).hex();

export default async function userByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    if (method === 'GET' && req.query.id) {
      const { error, value: id } = idSchema.validate(req.query.id);

      if (error) {
        return res.status(400).json({ error: 'Invalid id parameter' });
      }

      const user = await Users.findUser(id);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json('Resource not found');
      }
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
