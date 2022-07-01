import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
    companyId: Int
    userType: String
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }

  input CreateUserInput {
    name: String
    email: String
    password: String
    companyId: Int
  }

  input UpdateUserInput {
    id: Int
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
