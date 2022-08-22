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

  type QuantityPrice {
    quantity: Int!
    price: Int!
  }
`;

export default project;
