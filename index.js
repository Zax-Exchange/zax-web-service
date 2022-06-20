const { ApolloServer, gql } = require('apollo-server');

const queryResolvers = require("./resolvers/query");
const typeDefs = require("./types");



const server = new ApolloServer({
typeDefs,
resolvers: {
    ...queryResolvers,
},
csrfPrevention: true,
cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`);
});