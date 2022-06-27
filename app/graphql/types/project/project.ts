import { gql } from "apollo-server-express";

const project = gql`
  type Project {
    id: Int
    owner: Int
    name: String
    deliveryDate: String
    deliveryLocation: String
    budget: Int
    design: String
    createdAt: String
    updatedAt: String
  }

  input CreateProjectInput {
    owner: Int!
    name: String!
    deliveryDate: String!
    deliveryLocation: String!
    budget: Int!
    design: String
  }
`;

export default project;