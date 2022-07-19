import { gql } from "apollo-server-express";

const project = gql`
  type ProjectOverview {
    id: Int!
    companyId: Int!
    name: String!
    deliveryDate: String!
    deliveryCountry: String!
    deliveryCity: String!
    budget: Int!
    materials: [String!]!
    createdAt: String!
  }

  type Project {
    id: Int!
    userId: Int!
    companyId: Int!
    name: String!
    deliveryDate: String!
    deliveryCountry: String!
    deliveryCity: String!
    budget: Int!
    design: String
    status: String!
    components: [ProjectComponent!]!
    createdAt: String!
    updatedAt: String!
  }

  type VendorProject {
    id: Int!
    userId: Int!
    companyId: Int!
    name: String!
    deliveryDate: String!
    deliveryCountry: String!
    deliveryCity: String!
    budget: Int!
    design: String
    status: String!
    permission: String!
    components: [ProjectComponent!]!
    bidInfo: PermissionedProjectBid!
    createdAt: String!
    updatedAt: String!
  }

  type CustomerProject {
    id: Int!
    userId: Int!
    companyId: Int!
    name: String!
    deliveryDate: String!
    deliveryCountry: String!
    deliveryCity: String!
    budget: Int!
    design: String
    status: String!
    permission: String!
    components: [ProjectComponent!]!
    bids: [ProjectBid]
    createdAt: String!
    updatedAt: String!
  }

  type PermissionedProjectBid {
    id: Int!
    userId: Int!
    projectId: Int!
    companyId: Int!
    components: [ProjectBidComponent!]!
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
    companyId: Int!
    projectId: Int!
    comments: String!
    project: Project!
    components: [ProjectBidComponent!]!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectBidComponent {
    id: Int!
    projectBidId: Int!
    projectComponentId: Int!
    quantityPrices: [QuantityPrice!]!
    createdAt: String!
    updatedAt: String!
  }

  type UserPermission {
    userId: Int!
    email: String!
    name: String!
    permission: String!
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
    deliveryCountry: String!
    deliveryCity: String!
    budget: Int!
    design: String
    comments: String!
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
    components: [CreateProjectBidComponentInput!]!
  }

  input CreateProjectBidComponentInput {
    projectComponentId: Int!
    quantityPrices: [QuantityPriceInput!]!
  }

  input UpdateProjectInput {
    id: Int!
    name: String!
    deliveryDate: String!
    deliveryCountry: String!
    deliveryCity: String!
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
    components: [UpdateProjectBidComponentInput!]!
  }

  input UpdateProjectBidComponentInput {
    id: Int!
    quantityPrices: [QuantityPriceInput!]!
  }

  input UpdateProjectPermissionsInput {
    viewers: UpdateProjectPermissionsInputData!
    editors: UpdateProjectPermissionsInputData!
  }

  input UpdateProjectPermissionsInputData {
    userIds: [Int]!
    projectId: Int!
    permission: String!
  }

  input UpdateProjectBidPermissionsInput {
    viewers: UpdateProjectBidPermissionsInputData!
    editors: UpdateProjectBidPermissionsInputData!
  }

  input UpdateProjectBidPermissionsInputData {
    userIds: [Int]!
    projectBidId: Int!
    permission: String!
  }

  input GetProjectInput {
    userId: Int!
    projectId: Int!
  }

  input GetProjectBidInput {
    userId: Int!
    projectBidId: Int!
  }

  input DeleteProjectInput {
    userId: Int!
    projectId: Int!
  }

  input SearchProjectInput {
    userInput: String!
    deliveryCountries: [String]
    deliveryCities: [String]
    budget: Int
    leadTime: Int
  }

  input DeleteProjectPermissionsInput {
    userIds: [Int!]!
    projectId: Int!
  }

  input DeleteProjectBidPermissionsInput {
    userIds: [Int!]!
    projectBidId: Int!
  }
`;

export default project;