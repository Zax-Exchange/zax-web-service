import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getAllUsers: [User]
        getAllCompanies: [Company]
        getProjectsWithUserId(id: Int): [PermissionedProject]
        getProjectsWithProjectId(id: Int): [PermissionedProject]
    }
`;

export default query;