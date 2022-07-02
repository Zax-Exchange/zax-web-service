import { gql } from "apollo-server-express";

const query = gql`
    type Query {
        getAllUsers: [User]
        getAllCompanies: [Company]
        getProjectsWithUserId(id: Int): [Project]
        getProjectWithProjectId(data: GetProjectWithProjectIdInput): PermissionedProject
        getProjectBidsWithUserId(id: Int): [ProjectBid]
        getProjectBidWithProjectBidId(data: GetProjectBidWithProjectBidIdInput): PermissionedProjectBid
    }
`;

export default query;