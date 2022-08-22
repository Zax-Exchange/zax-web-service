import { gql } from "apollo-server-core/src/gql";

export default gql`
  input CreateProjectComponentInput {
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
  }

  input CreateProjectInput {
    userId: String!
    name: String!
    designId: String
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    comments: String!
    components: [CreateProjectComponentInput!]!
  }

  input QuantityPriceInput {
    quantity: Int!
    price: Int!
  }

  input CreateProjectBidInput {
    userId: String!
    projectId: String!
    comments: String!
    components: [CreateProjectBidComponentInput!]!
  }

  input CreateProjectBidComponentInput {
    projectComponentId: String!
    quantityPrices: [QuantityPriceInput!]!
  }
`;
