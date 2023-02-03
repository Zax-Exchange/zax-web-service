import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import getResolvers from "./graphql/resolvers";
import sequelize from "./postgres/dbconnection";
import { initModels } from "./models/init-models";
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
import ElasticProductService from "./elastic/product/ElasticProductService";
import ElasticCategoryService from "./elastic/category/ElasticCategoryService";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const startServer = async () => {
  initModels(sequelize);

  // try {
  //   await ElasticProductService.syncProductsWithES();
  //   console.log("product names synced with ES");
  // } catch (error) {
  //   console.error("Unable to sync products with ES:", error)
  // }

  // try {
  //   await ElasticCategoryService.syncCategoriesWithES();
  //   console.log("categories synced with ES");
  // } catch (error) {
  //   console.error("Unable to sync categories with ES:", error)
  // }

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
  app.use("/api/webhooks/stripe", express.raw({ type: "*/*" }));
  app.use(express.json());
  app.use(graphqlUploadExpress());
  // app.use(bodyParser.json());

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

  app.use("/api", apiRouters);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer();
export default startServer;
