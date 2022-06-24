import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import { ApolloServer, gql } from "apollo-server";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});