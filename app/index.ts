import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";
import sequelize from "./postgres/dbconnection";
import { initModels } from "./api/models/init-models";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { handleStripeWebhook } from "./rest/stripeWebhook";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const stripeWebhookIPs = [
  "3.18.12.63",
"3.130.192.231",
"13.235.14.237",
"13.235.122.149",
"18.211.135.69",
"35.154.171.200",
"52.15.183.38",
"54.88.130.119",
"54.88.130.237",
"54.187.174.169",
"54.187.205.235",
"54.187.216.72"
]
const startServer = async() => {

  initModels(sequelize);


  try {
    await sequelize.sync({ alter: true }).then(() => console.log("db initialized@"))
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const app = express();
  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    csrfPrevention: false,
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
  });

  await server.start();
  
  app.use(express.json());
  app.use(graphqlUploadExpress());
  app.use(bodyParser.json());

  server.applyMiddleware({app, cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com", "https://api.stripe.com"]
  }});

  app.post("/webhook", handleStripeWebhook);

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer()
export default startServer;
