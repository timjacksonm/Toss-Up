//A virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
import { ProfileExtended } from 'lib/types/IProfile';
import { prisma } from './prisma';

/**
 * Returns the number of questions that belong to a given topic.
 *
 * @param {Object} topic - The topic object containing the title of the topic.
 * @param {Object} prisma - The Prisma client instance.
 * @returns {Promise<number>} - The number of questions that belong to the topic.
 */
export async function questionCount(topic: string) {
  return await prisma.question.count({
    where: {
      mainTopic: topic,
    },
  });
}
