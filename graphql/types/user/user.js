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
`;

module.exports = user;
