import { Role } from "@prisma/client";

export interface userSignupInput {
  username: string;
  email: string;
  password: string;
  image?: string;
}

export interface userUpdateInput {
  username?: string;
  email?: string;
  image?: string;
}

export interface userSigninInput {
  email: string;
  password: string;
}
