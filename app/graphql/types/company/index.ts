import { gql } from "apollo-server-express";

const company = gql`
  type Vendor {
    id: String!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    country: String!
    planId: String!
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
    id: String!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    country: String!
    planId: String!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    companyUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type VendorOverview {
    id: String!
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
    id: String!
    name: String!
    logo: String
    country: String!
    isVerified: Boolean!
  }

  type PermissionedCompany {
    id: String!
    name: String!
    logo: String!
    phone: String!
    fax: String!
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

  type CompanyDetail {
    id: String!
    name: String!
    logo: String
    phone: String!
    fax: String
    country: String!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    companyUrl: String

    locations: [String]
    materials: [String]
    moq: String
    leadTime: Int

    createdAt: String!
    updatedAt: String!
  }

  type VendorDetail {
    id: String!
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
    id: String!
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

  input CreateCustomerInput {
    name: String!
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

  input UpdateVendorInput {
    id: String!
    data: UpdateVendorInputData!
  }

  input UpdateVendorInputData {
    name: String
    logo: String
    phone: String
    fax: String
    country: String
    companyUrl: String
    leadTime: Int
    moq: String
    locations: [String]
    materials: [String]
  }

  input UpdateCustomerInput {
    id: String!
    data: UpdateCustomerInputData!
  }

  input UpdateCustomerInputData {
    name: String
    logo: String
    phone: String
    fax: String
    country: String
    companyUrl: String
  }

  input UpdateCompanyPlanInput {
    planId: String!
    companyId: String!
  }

  input GetPermissionedCompanyInput {
    companyId: String!
    userId: String!
  }

  input SearchCompanyInput {
    userInput: String!
    locations: [String]
    moq: Int
    leadTime: Int
  }
`;

export default company;
