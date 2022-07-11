import { getUserWithUserId } from "./user/get/getUser";
import {
    getPermissionedCompany,
    getCompanyDetail,
} from "./company/getCompany";
import { getVendorProjects, getCustomerProjects, getProjectDetail } from "./project/get/getProject";
import { searchCustomerProjects } from "./search/vendorSearch";
import { searchVendorCompanies } from "./search/customerSearch";


export default {
    getUserWithUserId,
    getPermissionedCompany,
    getCompanyDetail,
    getVendorProjects,
    getCustomerProjects,
    getProjectDetail,
    searchCustomerProjects,
    searchVendorCompanies
};

