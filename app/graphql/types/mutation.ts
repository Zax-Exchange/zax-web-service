import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: CreateUserInput): LoggedInUser
        updateUser(data: UpdateUserInput): Boolean

        createProject(data: CreateProjectInput): Boolean
        createProjectBid(data: CreateProjectBidInput): Boolean
        updateProjectPermissions(data: UpdateProjectPermissionsInput): Boolean
        updateProjectBidPermissions(data: UpdateProjectBidPermissionsInput): Boolean
        updateProject(data: UpdateProjectInput): Boolean
        updateProjectBid(data: UpdateProjectBidInput): Boolean

        createVendor(data: CreateVendorInput): Boolean
        createCustomer(data: CreateCustomerInput): Boolean
        updateVendor(data: UpdateVendorInput): Boolean
        updateCustomer(data: UpdateCustomerInput): Boolean
        updateCompanyPlan(data: UpdateCompanyPlanInput): Boolean
        
        
        deleteProject(projectId: Int): Boolean
        deleteProjectPermissions(data: DeleteProjectPermissionsInput): Boolean
        deleteProjectBidPermissions(data: DeleteProjectBidPermissionsInput): Boolean
    }
`;

export default mutation;