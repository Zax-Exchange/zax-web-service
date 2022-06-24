import { gql } from "apollo-server";

const query = gql`
    type Query {
        getAllUsers: [User]
        getAllCompanies: [Company]
    }
`;

export default query;