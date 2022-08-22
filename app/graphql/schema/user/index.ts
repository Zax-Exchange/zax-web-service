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

  # for project/projectBid user info, mainly used when sharing projects/bids
  type UserPermission {
    userId: String!
    email: String!
    name: String!
    permission: String!
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

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

export default user;