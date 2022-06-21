const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    companyId: String
  }
`;

module.exports = user;
