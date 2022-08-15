import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: String!
    name: String!
    email: String!
    companyId: String!
    isVendor: Boolean!
    isAdmin: Boolean!
    isActive: Boolean!
  }

  type LoggedInUser {
    id: String!
    name: String!
    email: String!
    companyId: String!
    isVendor: Boolean!
    isAdmin: Boolean!
    token: String!
    notificationToken: String
    chatToken: String
    isActive: Boolean!
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
  }

  input UpdateUserPasswordInput {
    id: String!
    currentPassword: String!
    newPassword: String!
  }

  input UpdateUserPowerInput {
    id: String!
    isAdmin: Boolean!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

export default user;
