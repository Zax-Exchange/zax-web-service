import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
    companyId: Int
    createdAt: String
    updatedAt: String
  }

  input CreateUserInput {
    name: String
    email: String
    password: String
    companyId: Int
    isAdmin: Boolean
  }

  input UpdateUserInput {
    id: Int
    name: String
    email: String
    password: String
    companyId: Int
    isAdmin: Boolean
  }
`;

export default user;
