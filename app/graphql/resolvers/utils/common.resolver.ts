import GraphQLJSON from "graphql-type-json";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize: (value: unknown) => {
    // After storing objects in redis, Date will be converted to string (due to JSON.stringify()), so when returning a response to client
    // we need to check whether the value is string or object and handle accordingly
    if (typeof value === "string") {
      return value;
    }
    return (value as Date).toISOString();
  },
});

export default {
  JSON: GraphQLJSON,
  Date: dateScalar,
};
