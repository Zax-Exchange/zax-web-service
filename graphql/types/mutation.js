const { gql } = require("apollo-server");

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
    }
`;

module.exports = mutation;