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

  type StripeSubscription {
    subscriptionId: String!
    clientSecret: String!
  }
`;

export default plan;
