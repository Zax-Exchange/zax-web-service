import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getUserWithUserId(userId: Int): User
        getAllUsersWithinCompany(companyId: Int): [User]
        getPermissionedCompany(data: GetPermissionedCompanyInput): PermissionedCompany
        getCompanyDetail(companyId: Int): GeneralCompany
        getVendorProjects(userId: Int): [VendorProject]
        getProjectUsers(projectId: Int): [UserPermission]
        getProjectBidUsers(projectBidId: Int): [UserPermission]
        getCustomerProjects(userId: Int): [CustomerProject]
        getProjectDetail(projectId: Int): Project
        searchCustomerProjects(searchInput: SearchProjectInput): [ProjectOverview]
        searchVendorCompanies(searchInput: SearchCompanyInput): [CompanyOverview]
    }
`;

export default query;