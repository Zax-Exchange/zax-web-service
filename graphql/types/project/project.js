const { gql } = require("apollo-server");

const project = gql`
  type Project {
    customerName: String,
    projectName: String,
    estimatedTime: String,
    location: String,
    status: String,
    timestamp: String
  }
`;

module.exports = project;