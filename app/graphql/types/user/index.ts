import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    companyId: Int!
    isVendor: Boolean!
    isAdmin: Boolean!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    companyId: Int!
  }

  input UpdateUserInput {
    id: Int!
    name: String
    email: String
    password: String
  }

  input UpdateUserPower {
    id: Int
    isAdmin: Boolean
  }
`;

export default user;
