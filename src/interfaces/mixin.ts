export interface CustomError {
  code: string;
  message: string;
  meta?: {
    cause: string;
  };
}
