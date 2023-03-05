import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { ServerOnly } from 'lib/prisma/managers/serveronly';
const { Users } = ServerOnly;

interface ISignin {
  username: string;
  password: string;
}

const schema = Joi.object<ISignin>({
  username: Joi.string()
    .trim()
    .alphanum()
    .min(5)
    .max(16)
    .required()
    .lowercase(),
  password: Joi.string().required(),
});

export default async function verifyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    if (method === 'POST') {
      const { error, value: loginInput } = schema.validate(req.body);

      if (error) {
        return res
          .status(400)
          .json({ error: { message: error.message }, stack: error });
      }

      const verified = await Users.checkUser(loginInput);

      if (verified === true) {
        // return safe user object
        const user = await Users.findUser(loginInput.username);
        return res.status(200).json(user);
      }
      if (verified === false) {
        return res.status(401).json({
          error: {
            message:
              'Invalid Credentials: The provided email or password was incorrect. Please try again.',
          },
        });
      }
      if (verified === null) {
        return res.status(403).json({
          error: {
            message:
              'Email verification required. Please verify your email before logging in.',
          },
        });
      }
    } else {
      res.setHeader('Allow', ['POST']);
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
