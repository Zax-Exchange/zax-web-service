import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
        updateUser(updateUserInput: UpdateUserInput): Boolean
    }
`;

export default mutation;