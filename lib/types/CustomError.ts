export interface CustomError extends Error {
  error: {
    message: string;
  };
}
