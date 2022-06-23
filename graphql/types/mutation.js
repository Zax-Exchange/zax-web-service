const { gql } = require("apollo-server");

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
        updateUser(updateUserInput: UpdateUserInput): Boolean
    }
`;

module.exports = mutation;