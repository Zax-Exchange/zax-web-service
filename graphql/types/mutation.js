import { gql } from "apollo-server";

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
        updateUser(updateUserInput: UpdateUserInput): Boolean
    }
`;

export default mutation;