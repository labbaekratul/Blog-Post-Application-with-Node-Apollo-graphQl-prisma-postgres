export interface userSignupInput {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface userUpdateInput {
  name?: string;
  email?: string;
  image?: string;
}

export interface userSigninInput {
  email: string;
  password: string;
}
