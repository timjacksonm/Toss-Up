import { Users } from 'lib/prisma/managers';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';

const emailQuerySchema = Joi.object({
  email: Joi.string().email(),
});

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  try {
    if (method === 'GET') {
      const {
        error,
        value: { email },
      } = emailQuerySchema.validate(query);

      if (error) {
        return res
          .status(400)
          .json({ error: { message: error.message }, stack: error });
      }

      const users = await Users.findAllUsers(email);

      if (users) return res.status(200).json(users);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: error.message ?? 'Internal server error: api/auth/signup',
      },
    });
  }
}
