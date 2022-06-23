if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { ApolloServer, gql } = require('apollo-server');
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/types");


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