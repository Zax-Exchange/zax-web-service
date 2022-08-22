import { gql } from "apollo-server-core/src/gql";

export default gql`
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
`;
