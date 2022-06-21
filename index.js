const { ApolloServer, gql } = require('apollo-server');
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
// const queryResolvers = require("./resolvers/query");
// const typeDefs = require("./types");

const client = new DynamoDBClient({ region: "us-east-1" });

const getUsers = async () => {
  const params = {
    TableName: "zax-exchange-users",
  };

  try {
    const results = await client.send(new ScanCommand(params));
    const users = [];
    results.Items.forEach((item) => {
      users.push(unmarshall(item));
    });
    return users;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    companyId: String
  }
  type Query {
    users: [User]
  }
`;
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => getUsers(),
    },
  },
  csrfPrevention: true,
  cache: "bounded",
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`);
});