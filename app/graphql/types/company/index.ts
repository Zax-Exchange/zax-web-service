import { gql } from "apollo-server-express";

const company = gql`
  type Company {
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
    companyUrl: String!
    createdAt: String!
    updatedAt: String!
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
    isAdmin: Boolean!
    companyUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type GeneralCompany {
    id: Int!
    name: String!
    logo: String!
    phone: String!
    fax: String!
    country: String!
    isActive: Boolean!
    isVendor: Boolean!
    isVerified: Boolean!
    leadTime: Int
    companyUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCompanyInput {
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
    leadTime: Int
    companyUrl: String
  }

  input UpdateCompanyInput {
    id: Int!
    data: UpdateCompanyData
  }

  input UpdateCompanyData {
    name: String
    logo: String
    phone: String
    fax: String
    creditCardNumber: String
    creditCardExp: String
    creditCardCvv: String
    country: String
    planId: Int
    isActive: Boolean
    isVendor: Boolean
    isVerified: Boolean
    leadTime: Int
    companyUrl: String
  }

  input UpdateCompanyPlanInput {
    planId: Int!
    companyId: Int!
  }

  input GetPermissionedCompanyInput {
    companyId: Int!
    userId: Int!
  }
`;

export default company;
