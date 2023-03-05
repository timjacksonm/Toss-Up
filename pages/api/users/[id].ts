import { Users } from 'lib/prisma/managers';
import { NextApiRequest, NextApiResponse } from 'next';
import { strongPasswordRegex } from 'utils/validate';
import Joi from 'joi';
import { IUserUpdates } from 'lib/types/IUserUpdates';

const idSchema = Joi.string().length(24).hex();

const bodySchema = Joi.object<IUserUpdates>({
  username: Joi.string().trim().alphanum().min(5).max(16),
  firstName: Joi.string().pattern(/^[a-zA-Z]+$/),
  lastName: Joi.string().pattern(/^[a-zA-Z]+$/),
  password: Joi.string().pattern(strongPasswordRegex),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'edu', 'org'] },
    })
    .required()
    .trim()
    .lowercase(),
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
        return res
          .status(400)
          .json({ error: { message: error.message }, stack: error });
      }

      const user = await Users.findUser(id);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res
          .status(404)
          .json({ error: { message: `User with ID ${id} not found` } });
      }
    }

    if (method === 'PUT') {
      const { error: idError, value: id } = idSchema.validate(req.query.id);

      if (idError) {
        return res
          .status(400)
          .json({ error: { message: idError.message }, stack: idError });
      }

      const { error: bodyError, value } = bodySchema.validate(req.body);

      if (bodyError) {
        return res
          .status(400)
          .json({ error: { message: bodyError.message }, stack: bodyError });
      }

      if (Object.keys(value).length === 2 && value.password && value.email) {
        //Update password only
        return res
          .status(501)
          .json({ error: { message: 'Reset password not yet supported' } });
      } else {
        //Throw away password & email. Don't want them updated here
        const { password, email, ...updates } = value;
        const updatedUser = await Users.updateUser(id, updates);
        return res.status(201).json(updatedUser);
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
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
