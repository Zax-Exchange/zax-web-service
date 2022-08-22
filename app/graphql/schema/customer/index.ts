import { gql } from "apollo-server-core/src/gql";

export default gql`
  type CustomerOverview {
    id: String!
    name: String!
    contactEmail: String!
    logo: String
    country: String!
    isVerified: Boolean!
  }

  # to be augmented later when customer have more attributes
  type CustomerDetail {
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
`;