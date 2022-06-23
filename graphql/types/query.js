const { gql } = require("apollo-server");

const query = gql`
    type Query {
        getAllUsers: [User]
        getAllCompanies: [Company]
    }
`;

module.exports = query;