import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import prisma from "./utils/db";
const {
  createApollo4QueryValidationPlugin,
  constraintDirectiveTypeDefs,
} = require("graphql-constraint-directive/apollo4");

const app = express();
const { user } = prisma;
const { json } = bodyParser;

const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.*"));
let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeArray],
  resolvers: resolversArray,
});

const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    createApollo4QueryValidationPlugin(),
  ],
});

const startServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token,
        db: { user },
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
