import { gql } from "apollo-server-express";

const plan = gql`
  type Plan {
    id: String!
    name: String!
    price: Int!
    licensedUsers: Int!
    createdAt: String!
    updatedAt: String!
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
`;

export default plan;
