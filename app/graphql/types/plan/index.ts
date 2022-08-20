import { gql } from "apollo-server-express";

const plan = gql`
  type Plan {
    id: String!
    isVendor: Boolean!
    companySize: String
    tier: String
    pricings: Pricings!
  }

  type Pricings {
    monthly: PricingDetail
    annual: PricingDetail
    perUser: PricingDetail!
  }

  type PricingDetail {
    price: Int!
    priceId: String!
  }
  
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

  type StripeSubscription {
    subscriptionId: String!
    clientSecret: String!
  }

  input CreateVendorSubscriptionInput {
    subscriptionPriceId: String!
    perUserPriceId: String!
    stripeCustomerId: String!
  }
`;

export default plan;
