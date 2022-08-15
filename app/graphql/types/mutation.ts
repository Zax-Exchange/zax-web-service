import { gql } from "apollo-server-express";

const mutation = gql`
    type Mutation {
        createUser(data: CreateUserInput): LoggedInUser
        updateUser(data: UpdateUserInput): Boolean
        updateUserPassword(data: UpdateUserPasswordInput): Boolean
        updateUserPower(data: UpdateUserPowerInput): Boolean
        deactivateUser(email: String): Boolean

        createProject(data: CreateProjectInput): Boolean
        createProjectBid(data: CreateProjectBidInput): Boolean
        updateProjectPermissions(data: UpdateProjectPermissionsInput): Boolean
        updateProjectBidPermissions(data: UpdateProjectBidPermissionsInput): Boolean
        updateProject(data: UpdateProjectInput): Boolean
        updateProjectBid(data: UpdateProjectBidInput): Boolean

        createVendor(data: CreateVendorInput): String
        createCustomer(data: CreateCustomerInput): String
        createStripeCustomer(email: String): String
        createCustomerSubscription(priceId: String, stripeCustomerId: String): StripeSubscription
        createVendorSubscription(data: CreateVendorSubscriptionInput): StripeSubscription

        updateVendor(data: UpdateVendorInput): Boolean
        updateCustomer(data: UpdateCustomerInput): Boolean
        updateCompanyPlan(data: UpdateCompanyPlanInput): Boolean
        updateCompanyStatus(companyId: String, isActive: Boolean): Boolean
        updateSubscription(subscriptionId: String): Boolean
        updateCompanyPlanSubscriptionInfo(subscriptionId: String): Boolean

        deleteProject(projectId: String): Boolean
        deleteProjectPermissions(data: DeleteProjectPermissionsInput): Boolean
        deleteProjectBidPermissions(data: DeleteProjectBidPermissionsInput): Boolean

        inviteUser(email: String, userId: String): Boolean

        uploadProjectDesign(file: Upload!): String

        reset(t: Int):Boolean
    }
`;

export default mutation;
