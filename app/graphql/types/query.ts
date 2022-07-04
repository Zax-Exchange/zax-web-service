import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getUserWithUserId(userId: Int): User
        getPermissionedCompany(data: GetPermissionedCompanyInput): PermissionedCompany
        getGeneralCompany(companyId: Int): GeneralCompany
        getVendorProjects(userId: Int): [VendorProject]
        getCustomerProjects(userId: Int): [CustomerProject]
    }
`;

export default query;