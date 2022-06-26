import { gql } from "apollo-server-express";

const appNews = gql`
  type AppNews {
    title: String
    date: String
    message: String
  }
`;

export default appNews;