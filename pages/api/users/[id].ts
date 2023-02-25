import { Users } from 'lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import { strongPasswordRegex } from 'utils/validate';
import Joi from 'joi';
import { IUserUpdates } from 'lib/types/IUserUpdates';

const idSchema = Joi.string().length(24).hex();

const bodySchema = Joi.object<IUserUpdates>({
  name: Joi.string().trim().alphanum().min(5).max(16),
  firstName: Joi.string().pattern(/^[a-zA-Z]+$/),
  lastName: Joi.string().pattern(/^[a-zA-Z]+$/),
  password: Joi.string().pattern(strongPasswordRegex),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'edu', 'org'] },
    })
    .required()
    .trim(),
  emailVerified: Joi.boolean(),
  image: Joi.string().uri(),
});

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
    }

    if (method === 'PUT') {
      const { error, value: id } = idSchema.validate(req.query.id);

      if (error) {
        return res.status(400).json({ error: 'Invalid id parameter' });
      }

      const { error: bodyError, value } = bodySchema.validate(req.body);

      if (bodyError) {
        return res.status(400).json({ message: bodyError.message });
      }

      if (Object.keys(value).length === 2 && value.password && value.email) {
        //Update password only
        res.status(501).json({ message: 'Reset password not yet supported' });
      } else {
        //Throw away password & email. Don't want these updated here
        const { password, email, ...updates } = value;
        const updatedUser = await Users.updateUser(id, updates);
        return res.status(201).json(updatedUser);
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
