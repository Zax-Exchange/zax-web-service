const { gql } = require("apollo-server");

const query = gql`
    type Query {
        appNews: [AppNews]
        project(
            limit: Int
        ): [ProjectData]
        users: [User]
    }
`;

module.exports = query;