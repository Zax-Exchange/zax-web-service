import { gql } from "apollo-server-core/src/gql";

export default gql`
  input DeleteProjectInput {
    userId: String!
    projectId: String!
  }

  input DeleteProjectPermissionsInput {
    userIds: [String!]!
    projectId: String!
  }

  input DeleteProjectBidPermissionsInput {
    userIds: [String!]!
    projectBidId: String!
  }
`;
