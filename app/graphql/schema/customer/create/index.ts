import { gql } from "apollo-server-core/src/gql";

export default gql`
  input CreateCustomerInput {
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
    companyUrl: String
    userEmail: String!
  }
`;
