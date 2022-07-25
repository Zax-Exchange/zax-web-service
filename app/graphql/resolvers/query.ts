import { getUserWithUserId, getAllUsersWithinCompany } from "./user/get/getUser";
import {
    getCustomerDetail,
    getVendorDetail
} from "./company/getCompany";
import { getVendorProjects, 
    getCustomerProjects, 
    getProjectDetail, 
    getProjectUsers, 
    getProjectBidUsers 
} from "./project/get/getProject";

import { 
    getPlanWithPlanId, 
    getAllPlans 
} from "./plan/getPlan";
import { searchCustomerProjects } from "./search/vendorSearch";
import { searchVendorCompanies } from "./search/customerSearch";
import login from "./user/login/login";

export default {
    getPlanWithPlanId, 
    getAllPlans, 
    getUserWithUserId,
    getAllUsersWithinCompany,
    getCustomerDetail,
    getVendorDetail,
    getVendorProjects,
    getCustomerProjects,
    getProjectDetail,
    getProjectUsers,
    getProjectBidUsers,
    searchCustomerProjects,
    searchVendorCompanies,
    login
};

