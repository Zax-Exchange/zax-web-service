import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: CreateUserInput): Boolean
        updateUser(data: UpdateUserInput): Boolean
        createProject(data: CreateProjectInput): Boolean
        createProjectBid(data: CreateProjectBidInput): Boolean
        updateProjectPermissions(data: UpdateProjectPermissionsInput): Boolean
        updateProjectBidPermissions(data: UpdateProjectBidPermissionsInput): Boolean
        updateProject(data: UpdateProjectInput): Boolean
        updateProjectBid(data: UpdateProjectBidInput): Boolean
        deleteProject(data: DeleteProjectInput): Boolean
        createCompany(data: CreateCompanyInput): Boolean
        updateCompany(data: UpdateCompanyInput): Boolean
        updateCompanyPlan(data: UpdateCompanyPlanInput): Boolean
    }
`;

export default mutation;