const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
    companyId: Int
  }

  input CreateUserInput {
    name: String
    email: String
    password: String
    companyId: Int
    isAdmin: Boolean
  }

  input UpdateUserInput {
    id: Int
    name: String
    email: String
  }
`;

module.exports = user;
