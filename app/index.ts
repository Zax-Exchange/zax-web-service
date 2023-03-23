import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import getResolvers from "./graphql/resolvers";
import sequelize from "./postgres/dbconnection";
import { initModels } from "./db/models/init-models";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
} from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";
import getTypeDefs from "./graphql/typeDefs";
import jwt from "jsonwebtoken";
import apiRouters from "./rest";
import { syncElasticWithDB } from "./elastic/ElasticSyncUtils";
import stripeWhRouter from "./rest/webhooks/stripe/stripeWebhook";

if (process.env.NODE_ENV !== "production") {
}
dotenv.config();

const startServer = async () => {
  initModels(sequelize);

  // await syncElasticWithDB();

  try {
    await sequelize.sync({ alter: true }).then(() => console.log("db synced"));
    await sequelize.authenticate();
    console.log("Db connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  const app = express();
  const httpServer = http.createServer(app);
  const [typeDefs, resolvers] = await Promise.all([
    getTypeDefs(),
    getResolvers(),
  ]);
  const server = new ApolloServer({
    csrfPrevention: false,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: (ctx) => {
      try {
        if (ctx.req.headers.authorization) {
          const token = ctx.req.headers.authorization.split(" ")[1];

          const payload = jwt.verify(
            token,
            process.env.USER_SESSION_TOKEN_SECRET!
          );
        }
      } catch (error) {
        throw new AuthenticationError("INVALID_TOKEN");
      }
    },
  });

  await server.start();

  // Note: though works, figure out why we can't define this on the router itself
  // app.use("/api", apiRouters);
  app.use("/api/webhooks/stripe", express.raw({ type: "*/*" }), stripeWhRouter);
  app.use(express.json());
  app.use(graphqlUploadExpress());
  // app.use(bodyParser.json());

  const frontendUrl = process.env.FRONTEND_URL;
  const origins = [
    frontendUrl ? frontendUrl : "http://localhost:3000",
    "https://studio.apollographql.com",
    "https://api.stripe.com",
  ];
  server.applyMiddleware({
    app,
    cors: { origin: origins },
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer();
export default startServer;
