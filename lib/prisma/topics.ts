import { prisma, xprisma } from 'lib/prisma/prisma';

/**
 * A safe and limited selection of fields to include in a Prisma query response.
 * Suitable for returning non-sensitive data without exposing unnecessary information.
 */
const select = {
  id: true,
  title: true,
  description: true,
  imgUrl: true,
};

const findAllTopics = async () => {
  try {
    const topics = await prisma.topic.findMany({ select });
    return await Promise.all(
      topics.map(async (topic) => {
        const count = await xprisma.topic.questionCount(topic.title);
        return { ...topic, questionCount: count };
      })
    );
  } catch (error: any) {
    throw {
      message: 'Internal server error: Failed to find all topics',
      stack: error,
    };
  }
};

const Topics = { findAllTopics };
export { Topics };
