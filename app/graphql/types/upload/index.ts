import { gql } from "apollo-server-express";

export const upload = gql`
  scalar Upload

  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type FileUploadResponse {
    ETag: String!
    Location: String!
    key: String!
    Key: String!
    Bucket: String!
  }
`;
