import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getPlanWithPlanId(id: String): Plan
        getAllPlans: [Plan]
        getUserWithUserId(userId: String, paranoid: Boolean): User
        getAllUsersWithinCompany(companyId: String): [User]
        getCompanyDetail(companyId: String): CompanyDetail
        getCustomerDetail(companyId: String): CustomerDetail
        getVendorDetail(companyId: String): VendorDetail
        getVendorProjects(userId: String): [VendorProject]
        getProjectUsers(projectId: String): [UserPermission]
        getProjectBidUsers(projectBidId: String): [UserPermission]
        getCustomerProjects(userId: String): [CustomerProject]
        getProjectDetail(projectId: String): Project
        searchCustomerProjects(searchInput: SearchProjectInput): [ProjectOverview]
        searchVendorCompanies(searchInput: SearchCompanyInput): [VendorOverview]
        login(data: UserLoginInput): LoggedInUser
    }
`;

export default query;