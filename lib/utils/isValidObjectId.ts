/**
 * Determines whether a given string is a valid MongoDB ObjectID.
 *
 * @param {string} identifier - The string to check for ObjectID validity.
 * @returns {boolean} - True if the string is a valid ObjectID, false otherwise.
 */
export const isValidObjectId = (identifier: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(identifier);
};
