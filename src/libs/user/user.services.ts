import {
  userSigninInput,
  userSignupInput,
  userUpdateInput,
} from "interfaces/user.interfaces";
import { Prisma } from "utils/db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.stratagy";
import { customError } from "../../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// ## SIGNUP NEW USER
export const siginupUser = async (args: userSignupInput, db: Prisma) => {
  try {
    const { username, email, password, image } = args;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await db.user.create({
      data: { username, email, password: hashPassword, image },
    });
    const token = generateToken({ id: newUser.id, username: newUser.username });
    return {
      id: newUser.id,
      username: newUser.username,
      token,
    };
  } catch (error: any) {
    customError(error);
  }
};

// ## SIGNIN USER
export const sigininUser = async (args: userSigninInput, db: Prisma) => {
  const { email, password } = args;
  const error = { code: "401", message: "Invalid credentials." };
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return customError(error);
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = generateToken({ id: user.id, username: user.username });
    return {
      id: user.id,
      username: user.username,
      token,
    };
  }
  return customError(error);
};

// ## GET ALL USERS
export const getUsers = async (db: Prisma) => {
  return await db.user.findMany();
};

// ## GET USER BY ID
export const getUser = async (id: string, db: Prisma) => {
  const error = { code: "404", message: "Not found." };
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return customError(error);
  return user;
};

// ## UPDATE USER BY ID
export const updateUser = async (
  id: string,
  updateInput: userUpdateInput,
  db: Prisma
) => {
  const { username, email, image } = updateInput;
  try {
    return await db.user.update({
      where: { id },
      data: { username, email, image },
    });
  } catch (error: any) {
    customError(error);
  }
};

// ## DELETE USER BY ID
export const deleteUser = async (id: string, db: Prisma) => {
  try {
    const deleteUser = await await db.user.delete({ where: { id } });
    return { message: `User ${deleteUser.username} is removed from this list` };
  } catch (error: any) {
    customError(error);
  }
};
