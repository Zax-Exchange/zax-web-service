import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
        updateUser(updateUserInput: UpdateUserInput): Boolean
        createProject(createProjectInput: CreateProjectInput): Boolean
    }
`;

export default mutation;