import { gql } from "apollo-server-core/src/gql";

export default gql`
  input UpdateVendorInput {
    id: String!
    data: UpdateVendorInputData!
  }

  input UpdateVendorInputData {
    name: String!
    contactEmail: String!
    logo: String
    phone: String!
    fax: String
    country: String!
    companyUrl: String
    leadTime: Int!
    moq: String!
    locations: [String!]!
    materials: [String!]!
  }

  input UpdateCustomerInput {
    id: String!
    data: UpdateCustomerInputData!
  }

  input UpdateCustomerInputData {
    name: String!
    contactEmail: String!
    logo: String
    phone: String!
    fax: String
    country: String!
    companyUrl: String
  }

  input UpdateCompanyPlanInput {
    planId: String!
    companyId: String!
  }
`;
