import { gql } from "apollo-server-core/src/gql";

export default gql`
  input CreateVendorInput {
    name: String!
    contactEmail: String!
    logo: String
    phone: String!
    fax: String
    country: String!
    planId: String!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    leadTime: Int!
    locations: [String!]!
    moq: String!
    materials: [String!]!
    companyUrl: String
    userEmail: String!
  }

  input CreateVendorSubscriptionInput {
    subscriptionPriceId: String!
    perUserPriceId: String!
    stripeCustomerId: String!
  }
`;
