import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(createUserInput: CreateUserInput): Boolean
        updateUser(updateUserInput: UpdateUserInput): Boolean
        createProject(createProjectInput: CreateProjectInput): Boolean
        createProjectBid(createProjectBidInput: CreateProjectBidInput): Boolean
        createProjectPermission(createProjectPermissionInput: CreateProjectPermissionInput): Boolean
        updateProject(updateProjectInput: UpdateProjectInput): Boolean
        updateProjectBid(updateProjectBidInput: UpdateProjectBidInput): Boolean
    }
`;

export default mutation;