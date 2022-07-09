import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";
import SequelizeAuto from "sequelize-auto";
import sequelize from "./postgres/dbconnection";
import { initModels } from "./api/models/init-models";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const startServer = async() => {  
  
  initModels(sequelize);
 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  const app = express();
  await server.start();
  server.applyMiddleware({app});

  app.listen({port: 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  });
};

startServer()
export default startServer;