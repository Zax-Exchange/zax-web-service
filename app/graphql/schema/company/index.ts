import { gql } from "apollo-server-express";

export default gql`
  type CompanyPlan {
    id: String!
    planId: String!
    companyId: String!
  }
  type CompanyPlanDetail {
    tier: String
    price: Int!
    billingFrequency: String!
    memberSince: String!
    subscriptionStartDate: String!
    subscriptionEndDate: String!
    trialStartDate: String
    trialEndDate: String
  }
  type PermissionedCompany {
    id: String!
    name: String!
    contactEmail: String!
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
    contactEmail: String!
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
`;