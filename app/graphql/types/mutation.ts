import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: CreateUserInput): Boolean
        updateUser(data: UpdateUserInput): Boolean
        createProject(data: CreateProjectInput): Boolean
        createProjectBid(data: CreateProjectBidInput): Boolean
        createProjectPermission(data: CreateProjectPermissionInput): Boolean
        createProjectBidPermission(data: CreateProjectBidPermissionInput): Boolean
        updateProject(data: UpdateProjectInput): Boolean
        updateProjectBid(data: UpdateProjectBidInput): Boolean
    }
`;

export default mutation;