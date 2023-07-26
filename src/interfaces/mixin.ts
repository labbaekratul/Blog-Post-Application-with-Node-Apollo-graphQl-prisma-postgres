export interface CustomError {
  code: string;
  message: string;
  meta?: {
    cause: string;
  };
}

export interface tokenParams {
  id: string;
  username: string;
  role: string;
}
