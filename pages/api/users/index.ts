import { Users } from 'lib/prisma/managers';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { CustomError } from 'lib/types/CustomError';

interface IEmailQuery {
  email: string;
}

const emailQuerySchema = Joi.object<IEmailQuery>({
  email: Joi.string().email(),
});

export default async function usersHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  try {
    if (method === 'GET') {
      const { error, value } = emailQuerySchema.validate(query);

      if (error) {
        return res.status(400).json({ error: { message: error.message }, stack: error });
      }

      const users = await Users.findAllUsers(value.email);

      if (users) return res.status(200).json(users);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method || ''} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    const { message } = error as CustomError;
    return res.status(500).json({
      error: {
        message: message ?? 'Internal server error: api/auth/signup',
      },
    });
  }
}
