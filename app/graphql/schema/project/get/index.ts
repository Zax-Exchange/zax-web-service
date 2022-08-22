import { gql } from "apollo-server-core/src/gql";

export default gql`
  input GetProjectInput {
    userId: String!
    projectId: String!
  }

  input GetProjectBidInput {
    userId: String!
    projectBidId: String!
  }

  input SearchProjectInput {
    userInput: String!
    deliveryCountries: [String]
    deliveryCities: [String]
    budget: Int
    leadTime: Int
  }
`;
