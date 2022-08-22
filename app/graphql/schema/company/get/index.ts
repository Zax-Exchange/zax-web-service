import { gql } from "apollo-server-core/src/gql";

export default gql`
  input GetPermissionedCompanyInput {
    companyId: String!
    userId: String!
  }

  input SearchCompanyInput {
    userInput: String!
    locations: [String!]
    moq: Int
    leadTime: Int
  }
`;
