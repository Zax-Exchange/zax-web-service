import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";

const PORT = process.env.PORT || 4000;

const startServer = async() => {

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  const app = express();
  await server.start();
  server.applyMiddleware({app});

  app.listen({port: PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  });
};

startServer()
export default startServer;