import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        checkUserEmail(email: String): Boolean
        checkCompanyName(name: String): Boolean

        getCompanyPlanWithCompanyId(companyId: String): CompanyPlanDetail
        getPlanWithPlanId(id: String): Plan
        getAllPlans(isVendor: Boolean): [Plan]

        getUserWithUserId(userId: String, paranoid: Boolean): User
        getAllUsersWithinCompany(companyId: String): [User]

        getCompanyPlanDetail(companyId: String): Boolean
        getCompanyDetail(companyId: String): CompanyDetail
        getCustomerDetail(companyId: String): CustomerDetail
        getVendorDetail(companyId: String): VendorDetail

        getVendorProject(data: GetProjectInput): VendorProject
        getVendorProjects(userId: String): [VendorProject]
        getProjectUsers(projectId: String): [UserPermission]
        getProjectBidUsers(projectBidId: String): [UserPermission]
        getCustomerProject(data: GetProjectInput): CustomerProject
        getCustomerProjects(userId: String): [CustomerProject]
        getProjectDetail(projectId: String): Project

        searchCustomerProjects(searchInput: SearchProjectInput): [ProjectOverview]
        searchVendorCompanies(searchInput: SearchCompanyInput): [VendorOverview]

        login(data: UserLoginInput): LoggedInUser
    }
`;

export default query;