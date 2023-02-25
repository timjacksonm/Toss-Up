import { Users } from 'lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { strongPasswordRegex } from 'utils/validate';
import { IUserCreate } from 'lib/types/IUserCreate';

const schema = Joi.object<IUserCreate>({
  username: Joi.string().trim().alphanum().min(5).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'edu', 'org'] },
    })
    .required()
    .trim(),
  password: Joi.string().pattern(strongPasswordRegex).required(),
  cpassword: Joi.string().valid(Joi.ref('password')).required(),
});

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === 'POST') {
      const { value: validatedUserData, error } = schema.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json({ error: error });
      }

      const user = await Users.createUser(validatedUserData!);

      if (user) {
        return res.status(201).json(user);
      }

      return res.status(409).json({
        message:
          'This email address has already been registered. Please use a different email or log in to your existing account.',
      });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
