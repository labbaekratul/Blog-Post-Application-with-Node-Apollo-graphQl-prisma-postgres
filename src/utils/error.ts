import { GraphQLError } from "graphql";
import { CustomError } from "interfaces/mixin";

export const customError = (err: CustomError) => {
  let error;
  switch (err.code) {
    case "P2000":
      error = new GraphQLError(
        "The provided value for the column is too long for the column's type.",
        {
          extensions: {
            code: 400,
          },
        }
      );
      break;
    case "P2002":
      error = new GraphQLError("Record already exists.", {
        extensions: {
          code: 409,
        },
      });
      break;
    case "P2025":
      error = new GraphQLError(err.meta?.cause ?? "Not found", {
        extensions: {
          code: 404,
        },
      });
      break;
    case "401":
      error = new GraphQLError(err.message, {
        extensions: {
          code: 401,
        },
      });
      break;
    case "404":
      error = new GraphQLError(err.message, {
        extensions: {
          code: 404,
        },
      });
      break;
    default:
      error = new GraphQLError(err.message, {
        extensions: {
          code: 500,
        },
      });
      break;
  }

  throw error;
};
