import { gql } from "apollo-server-express";

const project = gql`
  type Project {
    id: Int!
    userId: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectComponent {
    id: Int!
    projectId: Int!
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectBid {
    userId: Int!
    projectId: Int!
    comments: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateProjectComponentInput {
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
  }

  input CreateProjectInput {
    userId: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String
    components: [CreateProjectComponentInput!]!
  }

  input QuantityPrice {
    quantity: Int!
    price: Int!
  }

  input CreateProjectBidInput {
    userId: Int!
    projectId: Int!
    comments: String
    components: [CreateProjectComponentBidInput!]!
  }

  input CreateProjectComponentBidInput {
    componentBidQuantityPrices: [ComponentBidQuantityPrice!]!
  }

  input ComponentBidQuantityPrice {
    projectComponentId: Int!
    quantityPrices: [QuantityPrice!]!
  }

  input UpdateProjectInput {
    id: Int!
    name: String
    deliveryDate: String
    deliveryLocation: String
    budget: Int
    design: String
  }

  input UpdateProjectComponentInput {
    id: Int!
    name: String
    materials: [String]
    dimension: String
    postProcess: String
  }
`;

export default project;