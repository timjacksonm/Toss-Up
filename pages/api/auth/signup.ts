import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { strongPasswordRegex } from 'utils/validate';
import { IUserCreate } from 'lib/types/IUserCreate';
import { ServerOnly } from 'lib/prisma/managers/serveronly';
import { CustomError } from 'lib/types/CustomError';

const { Users } = ServerOnly;

const schema = Joi.object<IUserCreate>({
  username: Joi.string().trim().alphanum().min(5).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'edu', 'org'] },
    })
    .required()
    .trim()
    .lowercase(),
  password: Joi.string().pattern(strongPasswordRegex).required(),
  cpassword: Joi.string().valid(Joi.ref('password')).required(),
});

export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    if (method === 'POST') {
      const { value: validatedUserData, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: { message: error.message }, stack: error });
      }

      const result = await Users.createUser(validatedUserData);

      if (result.errors?.existingName) {
        return res.status(409).json({
          error: {
            message:
              'This username has already been registered. Please use a different username or log in to your existing account.',
          },
        });
      }

      if (result.errors?.existingEmail) {
        return res.status(409).json({
          error: {
            message:
              'This email address has already been registered. Please use a different email or log in to your existing account.',
          },
        });
      }

      return res.status(201).json(result.user);
    } else {
      res.setHeader('Allow', ['POST']);
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
