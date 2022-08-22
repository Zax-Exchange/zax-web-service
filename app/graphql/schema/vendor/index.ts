import { gql } from "apollo-server-core/src/gql";

export default gql`
  type VendorOverview {
    id: String!
    name: String!
    contactEmail: String!
    logo: String
    country: String!
    isVerified: Boolean!
    locations: [String]!
    materials: [String]!
    moq: String!
    leadTime: Int!
  }

  type VendorDetail {
    id: String!
    name: String!
    contactEmail: String!
    phone: String!
    logo: String
    country: String!
    isActive: Boolean!
    companyUrl: String
    fax: String
    isVerified: Boolean!

    locations: [String]!
    materials: [String]!
    moq: String!
    leadTime: Int!
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
`;
