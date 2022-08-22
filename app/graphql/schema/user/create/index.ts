import { gql } from "apollo-server-core/src/gql";

export default gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    companyId: String!
  }
`;
