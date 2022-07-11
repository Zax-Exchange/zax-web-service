import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getUserWithUserId(userId: Int): User
        getPermissionedCompany(data: GetPermissionedCompanyInput): PermissionedCompany
        getCompanyDetail(companyId: Int): GeneralCompany
        getVendorProjects(userId: Int): [VendorProject]
        getCustomerProjects(userId: Int): [CustomerProject]
        getProjectDetail(projectId: Int): Project
        searchCustomerProjects(searchInput: SearchProjectInput): [ProjectOverview]
        searchVendorCompanies(searchInput: SearchCompanyInput): [CompanyOverview]
    }
`;

export default query;