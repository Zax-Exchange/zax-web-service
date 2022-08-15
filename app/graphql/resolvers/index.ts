import queryResolvers from "./query";
import mutationResolvers from "./mutation";
import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Query: queryResolvers,
  Mutation: mutationResolvers
};
