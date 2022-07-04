import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getUserWithUserId: User
        getAllCompanies: [Company]
        getVendorProjects(data: GetProjectInput): [VendorProject]
        getCustomerProjects(data: GetProjectInput): [CustomerProject]
    }
`;

export default query;