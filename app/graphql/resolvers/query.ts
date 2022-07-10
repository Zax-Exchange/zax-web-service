import { getUserWithUserId } from "./user/get/getUser";
import {
    getPermissionedCompany,
    getGeneralCompany,
} from "./company/getCompany";
import { getVendorProjects, getCustomerProjects, getProjectDetail } from "./project/get/getProject";
import { searchCustomerProjects } from "./search/vendorSearch";
export default {
    getUserWithUserId,
    getPermissionedCompany,
    getGeneralCompany,
    getVendorProjects,
    getCustomerProjects,
    getProjectDetail,
    searchCustomerProjects
};

