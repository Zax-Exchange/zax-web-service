import GraphQLJSON from "graphql-type-json";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize: (value: unknown) => {
    return (value as Date).toISOString(); // Convert outgoing Date to integer for JSON
  },
  // parseValue(value: string) {
  //   return new Date(value); // Convert incoming integer to Date
  // },
  // parseLiteral(ast) {
  //   if (ast.kind === Kind.INT) {
  //     return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
  //   }
  //   return null; // Invalid hard-coded value (not an integer)
  // },
});

export default {
  JSON: GraphQLJSON,
  Date: dateScalar,
};
