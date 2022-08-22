import { gql } from "apollo-server-core/src/gql";

export default gql`
  input UpdateProjectInput {
    id: String!
    name: String!
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    components: [UpdateProjectComponentInput!]!
  }

  input UpdateProjectComponentInput {
    id: String!
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
  }

  input UpdateProjectBidInput {
    id: String!
    comments: String!
    components: [UpdateProjectBidComponentInput!]!
  }

  input UpdateProjectBidComponentInput {
    id: String!
    quantityPrices: [QuantityPriceInput!]!
  }

  input UpdateProjectPermissionsInput {
    viewers: UpdateProjectPermissionsInputData!
    editors: UpdateProjectPermissionsInputData!
  }

  input UpdateProjectPermissionsInputData {
    userIds: [String]!
    projectId: String!
    permission: String!
  }

  input UpdateProjectBidPermissionsInput {
    viewers: UpdateProjectBidPermissionsInputData!
    editors: UpdateProjectBidPermissionsInputData!
  }

  input UpdateProjectBidPermissionsInputData {
    userIds: [String]!
    projectId: String!
    projectBidId: String!
    permission: String!
  }
`;