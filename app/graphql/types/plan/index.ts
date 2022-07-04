import { gql } from "apollo-server-express";

const plan = gql`
  type Plan {
    id: Int!
    name: String!
    price: Int!
    licensedUsers: Int!
    createdAt: String!
    updatedAt: String!
  }

  type CompanyPlan {
    id: Int!
    planId: Int!
    companyId: Int!
    remainingQuota: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

export default plan;
