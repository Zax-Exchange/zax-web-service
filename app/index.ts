import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import getResolvers from "./graphql/resolvers";
import sequelize from "./postgres/dbconnection";
import { initModels } from "./models/init-models";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { handleStripeWebhook } from "./rest/stripeWebhook";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";
import getTypeDefs from "./graphql/typeDefs";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const startServer = async () => {
  initModels(sequelize);

  // try {
  //   await sequelize
  //     .sync({ alter: true })
  //     .then(() => console.log("db initialized@"));
  //   await sequelize.authenticate();
  //   console.log("Connection has been established successfully.");
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  // }
  const app = express();
  const httpServer = http.createServer(app);
  const typeDefs = await getTypeDefs();
  const resolvers = await getResolvers();
  const server = new ApolloServer({
    csrfPrevention: false,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(express.json());
  app.use(graphqlUploadExpress());
  app.use(bodyParser.json());

  server.applyMiddleware({
    app,
    cors: {
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://api.stripe.com",
      ],
    },
  });

  // TODO: refactor this
  app.post("/webhook", handleStripeWebhook);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer();
export default startServer;
