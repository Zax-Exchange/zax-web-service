import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: String!
    name: String!
    email: String!
    companyId: String!
    isVendor: Boolean!
    isAdmin: Boolean!
  }

  type LoggedInUser {
    id: String!
    name: String!
    email: String!
    companyId: String!
    isVendor: Boolean!
    isAdmin: Boolean!
    token: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    companyId: String!
  }

  input UpdateUserInput {
    id: String!
    name: String
    email: String
    password: String
  }

  input UpdateUserPower {
    id: String!
    isAdmin: Boolean!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

export default user;
