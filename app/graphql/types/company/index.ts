import { gql } from "apollo-server-express";

const company = gql`
  type Vendor {
    id: Int!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    creditCardNumber: String!
    creditCardExp: String!
    creditCardCvv: String!
    country: String!
    planId: Int!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    leadTime: Int!
    locations: [String]!
    moq: Int!
    materials: [String]
    companyUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type Customer {
    id: Int!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    creditCardNumber: String!
    creditCardExp: String!
    creditCardCvv: String!
    country: String!
    planId: Int!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    companyUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type VendorOverview {
    id: Int!
    name: String!
    logo: String
    country: String!
    isVerified: Boolean!
    locations: [String]!
    materials: [String]!
    moq: String!
    leadTime: Int!
  }

  type CustomerOverview {
    id: Int!
    name: String!
    logo: String
    country: String!
    isVerified: Boolean!
  }

  type PermissionedCompany {
    id: Int!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    creditCardNumber: String!
    creditCardExp: String!
    creditCardCvv: String!
    country: String!
    planInfo: CompanyPlan!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    leadTime: Int
    locations: [String]
    moq: Int
    materials: [String]
    isAdmin: Boolean!
    companyUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type VendorDetail {
    id: Int!
    name: String!
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

  type CustomerDetail {
    id: Int!
    name: String!
    phone: String!
    logo: String
    country: String!
    isActive: Boolean!
    companyUrl: String
    fax: String
    isVerified: Boolean!
  }

  input CreateVendorInput {
    name: String!
    logo: String
    phone: String!
    fax: String
    creditCardNumber: String!
    creditCardExp: String!
    creditCardCvv: String!
    country: String!
    planId: Int!
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

  input CreateCustomerInput {
    name: String!
    logo: String
    phone: String!
    fax: String
    creditCardNumber: String!
    creditCardExp: String!
    creditCardCvv: String!
    country: String!
    planId: Int!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    companyUrl: String
    userEmail: String!
  }

  input UpdateVendorInput {
    id: Int!
    data: UpdateVendorInputData
  }

  input UpdateVendorInputData {
    name: String
    logo: String
    phone: String
    fax: String
    creditCardNumber: String
    creditCardExp: String
    creditCardCvv: String
    country: String
    companyUrl: String
    isActive: Boolean
    isVerified: Boolean
    leadTime: Int
    moq: String
    locations: [String]
    materials: [String]
  }

  input UpdateCustomerInput {
    id: Int!
    data: UpdateCustomerInputData
  }

  input UpdateCustomerInputData {
    name: String
    logo: String
    phone: String
    fax: String
    creditCardNumber: String
    creditCardExp: String
    creditCardCvv: String
    country: String
    companyUrl: String
    isActive: Boolean
    isVerified: Boolean
  }

  input UpdateCompanyPlanInput {
    planId: Int!
    companyId: Int!
  }

  input GetPermissionedCompanyInput {
    companyId: Int!
    userId: Int!
  }

  input SearchCompanyInput {
    userInput: String!
    locations: [String]
    moq: Int
    leadTime: Int
  }
`;

export default company;
