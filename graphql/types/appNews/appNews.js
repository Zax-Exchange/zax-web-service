const { gql } = require("apollo-server");

const appNews = gql`
  type AppNews {
    title: String
    date: String
    message: String
  }
`;

module.exports = appNews;