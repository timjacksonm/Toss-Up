import { PrismaClient } from '@prisma/client';
import { questionCount } from './virtuals';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

/**
 * `$extends` is a Prisma preview feature that allows you to add custom methods to the default Prisma Client.
 *
 * You can use the model component of `$extends` to add new operations, encapsulated business logic,
 * repetitive operations, and model-specific utilities to your models. This feature was introduced in version 4.7.0
 * of Prisma.
 *
 * To use `$extends`, enable it in the `schema.prisma` file under the `generator client` block and add a
 * `previewFeatures` property to the Prisma configuration file.
 *
 * @typedef {Object} xprisma - An object that extends the default Prisma Client with additional methods.
 */
export const xprisma = prisma.$extends({
  model: {
    topic: {
      questionCount: questionCount,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
