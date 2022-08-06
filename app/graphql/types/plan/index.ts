import { gql } from "apollo-server-express";

const plan = gql`
  type Plan {
    id: String!
    isVendor: Boolean!
    planTier: String
    name: String!
    pricings: Pricings!
    licensedUsers: Int!
    features: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Pricings {
    monthly: PricingDetail!
    annual: PricingDetail!
    additionalLicense: PricingDetail!
  }

  type PricingDetail {
    price: Int!
    priceId: String!
  }
  
  type CompanyPlan {
    id: String!
    planId: String!
    companyId: String!
    remainingQuota: Int!
    description: String!
    features: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type StripeSubscription {
    subscriptionId: String!
    clientSecret: String!
  }
`;

export default plan;
