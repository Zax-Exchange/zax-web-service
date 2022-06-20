const { gql } = require("apollo-server");

const projectData = gql`
  type ProjectData {
    customerName: String,
    projectName: String,
    estimatedTime: String,
    location: String,
    status: String,
    timestamp: String
  }
`;

module.exports = projectData;