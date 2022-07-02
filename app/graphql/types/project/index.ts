import { gql } from "apollo-server-express";

const project = gql`
  type Project {
    id: Int!
    userId: Int!
    companyId: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String!
    status: String!
    components: [ProjectComponent!]!
    createdAt: String!
    updatedAt: String!
  }

  type PermissionedProject {
    id: Int!
    userId: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String!
    status: String!
    components: [ProjectComponent!]!
    permission: String!
    createdAt: String!
    updatedAt: String!
  }

  type PermissionedProjectBid {
    id: Int!
    userId: Int!
    projectId: Int!
    project: Project!
    components: [ProjectComponentBid!]!
    permission: String!
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
    id: Int!
    userId: Int!
    projectId: Int!
    comments: String!
    project: Project!
    componentBids: [ProjectComponentBid!]!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectComponentBid {
    id: Int!
    projectBidId: Int!
    projectComponentId: Int!
    quantityPrices: [QuantityPrice!]!
    createdAt: String!
    updatedAt: String!
  }

  type QuantityPrice {
    quantity: Int!
    price: Int!
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

  input QuantityPriceInput {
    quantity: Int!
    price: Int!
  }

  input CreateProjectBidInput {
    userId: Int!
    projectId: Int!
    comments: String!
    components: [CreateProjectComponentBidInput!]!
  }

  input CreateProjectComponentBidInput {
    componentBidQuantityPrices: [ComponentBidQuantityPrice!]!
  }

  input ComponentBidQuantityPrice {
    projectComponentId: Int!
    quantityPrices: [QuantityPriceInput!]!
  }

  input UpdateProjectInput {
    id: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String!
    components: [UpdateProjectComponentInput!]!
  }

  input UpdateProjectComponentInput {
    id: Int!
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
  }

  input UpdateProjectBidInput {
    id: Int!
    comments: String!
    components: [UpdateProjectComponentBidInput!]!
  }

  input UpdateProjectComponentBidInput {
    id: Int!
    quantityPrices: [QuantityPriceInput!]!
  }

  input UpdateProjectPermissionsInput {
    userId: [Int]!
    projectId: Int!
    permission: String!
  }

  input UpdateProjectBidPermissionsInput {
    userId: [Int]!
    projectBidId: Int!
    permission: String!
  }

  input GetProjectWithProjectIdInput {
    userId: Int!
    projectId: Int!
    isVendor: Boolean!
  }

  input GetProjectBidWithProjectBidIdInput {
    userId: Int!
    projectBidId: Int!
    isVendor: Boolean!
  }

  input DeleteProjectInput {
    userId: Int!
    projectId: Int!
  }
`;

export default project;