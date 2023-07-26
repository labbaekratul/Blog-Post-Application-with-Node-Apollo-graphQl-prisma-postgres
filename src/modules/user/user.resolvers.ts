import {
  userSigninInput,
  userSignupInput,
  userUpdateInput,
} from "interfaces/user.interfaces";
import {
  siginupUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  sigininUser,
} from "./user.services";
import { Prisma } from "utils/db";

export const resolvers = {
  // ## USER QUERY
  Query: {
    getUsers: (_parent: undefined, _args: null, context: { db: Prisma }) => {
      const { db } = context;
      return getUsers(db);
    },

    getUser: (_: undefined, args: { id: string }, context: { db: Prisma }) => {
      const { id } = args;
      const { db } = context;
      return getUser(id, db);
    },
  },

  // ## USER MUTATTION
  Mutation: {
    siginupUser: (
      _: undefined,
      args: { input: userSignupInput },
      context: { db: Prisma }
    ) => {
      const { db } = context;
      const { input } = args;
      return siginupUser(input, db);
    },

    sigininUser: (
      _: undefined,
      args: { input: userSigninInput },
      context: { db: Prisma }
    ) => {
      const { db } = context;
      const { input } = args;
      return sigininUser(input, db);
    },

    updateUser: (
      _: undefined,
      args: { id: string; updateInput: userUpdateInput },
      context: { db: Prisma }
    ) => {
      const { db } = context;
      const { id } = args;
      const { updateInput } = args;
      return updateUser(id, updateInput, db);
    },

    deleteUser: (
      _: undefined,
      args: { id: string },
      context: { db: Prisma }
    ) => {
      const { db } = context;
      const { id } = args;
      return deleteUser(id, db);
    },
  },
};
