import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getAllUsers: [User]
        getAllCompanies: [Company]
    }
`;

export default query;