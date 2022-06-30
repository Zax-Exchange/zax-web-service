import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: CreateUserInput): Boolean
        updateUser(data: UpdateUserInput): Boolean
        createProject(data: CreateProjectInput): Boolean
        createProjectBid(data: CreateProjectBidInput): Boolean
        createOrUpdateProjectPermission(data: CreateOrUpdateProjectPermissionInput): Boolean
        createOrUpdateProjectBidPermission(data: CreateOrUpdateProjectBidPermissionInput): Boolean
        updateProject(data: UpdateProjectInput): Boolean
        updateProjectBid(data: UpdateProjectBidInput): Boolean
        deleteProject(data: DeleteProjectInput): Boolean
    }
`;

export default mutation;