import { getUserWithUserId, getAllUsersWithinCompany } from "./user/get/getUser";
import {
    getPermissionedCompany,
    getCompanyDetail,
} from "./company/getCompany";
import { getVendorProjects, getCustomerProjects, getProjectDetail, getProjectUsers, getProjectBidUsers } from "./project/get/getProject";
import { searchCustomerProjects } from "./search/vendorSearch";
import { searchVendorCompanies } from "./search/customerSearch";


export default {
    getUserWithUserId,
    getAllUsersWithinCompany,
    getPermissionedCompany,
    getCompanyDetail,
    getVendorProjects,
    getCustomerProjects,
    getProjectDetail,
    getProjectUsers,
    getProjectBidUsers,
    searchCustomerProjects,
    searchVendorCompanies
};

