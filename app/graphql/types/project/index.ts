import { gql } from "apollo-server-express";

const project = gql`
  type ProjectOverview {
    id: String!
    companyName: String!
    companyId: String!
    name: String!
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    materials: [String!]!
    createdAt: String!
  }
  type ProjectDesign {
    fileName: String!
    url: String!
  }

  type Project {
    id: String!
    userId: String!
    companyId: String!
    companyName: String!
    name: String!
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    design: ProjectDesign
    status: String!
    components: [ProjectComponent!]!
    createdAt: String!
    updatedAt: String!
  }

  type VendorProject {
    id: String!
    userId: String!
    customerName: String!
    companyId: String!
    name: String!
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    design: ProjectDesign
    status: String!
    permission: String!
    components: [ProjectComponent!]!
    bidInfo: PermissionedProjectBid!
    createdAt: String!
    updatedAt: String!
  }

  type CustomerProject {
    id: String!
    userId: String!
    companyId: String!
    name: String!
    deliveryDate: String!
    deliveryAddress: String!
    budget: Int!
    design: ProjectDesign
    status: String!
    permission: String!
    components: [ProjectComponent!]!
    bids: [ProjectBid]
    createdAt: String!
    updatedAt: String!
  }

  type PermissionedProjectBid {
    id: String!
    userId: String!
    projectId: String!
    companyId: String!
    components: [ProjectBidComponent!]!
    permission: String!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectComponent {
    id: String!
    projectId: String!
    name: String!
    materials: [String!]!
    dimension: String!
    postProcess: String!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectBid {
    id: String!
    userId: String!
    companyId: String!
    projectId: String!
    comments: String!
    project: Project!
    components: [ProjectBidComponent!]!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectBidComponent {
    id: String!
    projectBidId: String!
    projectComponentId: String!
    quantityPrices: [QuantityPrice!]!
    createdAt: String!
    updatedAt: String!
  }

  type UserPermission {
    userId: String!
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

  input GetProjectInput {
    userId: String!
    projectId: String!
  }

  input GetProjectBidInput {
    userId: String!
    projectBidId: String!
  }

  input DeleteProjectInput {
    userId: String!
    projectId: String!
  }

  input SearchProjectInput {
    userInput: String!
    deliveryCountries: [String]
    deliveryCities: [String]
    budget: Int
    leadTime: Int
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

export default project;
