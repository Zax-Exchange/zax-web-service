import { getUserWithUserId, getAllUsersWithinCompany } from "./user/get/getUser";
import { checkCompanyName } from "./company/createCompany";
import {
    getCustomerDetail,
    getVendorDetail,
    getCompanyDetail,
    getCompanyPlanDetail
} from "./company/getCompany";
import { getVendorProjects, 
    getCustomerProjects, 
    getProjectDetail, 
    getProjectUsers, 
    getProjectBidUsers 
} from "./project/get/getProject";

import { 
    getPlanWithPlanId, 
    getAllPlans,
    getCompanyPlanWithCompanyId 
} from "./plan/getPlan";
import { searchCustomerProjects } from "./search/vendorSearch";
import { searchVendorCompanies } from "./search/customerSearch";
import login from "./user/login/login";
import { checkUserEmail } from "./plan/createSubscription";

export default {
    checkUserEmail,
    checkCompanyName,

    getPlanWithPlanId, 
    getCompanyPlanWithCompanyId,
    getAllPlans, 

    getUserWithUserId,
    getAllUsersWithinCompany,

    getCompanyPlanDetail,
    getCustomerDetail,
    getVendorDetail,
    getCompanyDetail,

    getVendorProjects,
    getCustomerProjects,
    getProjectDetail,
    getProjectUsers,
    getProjectBidUsers,

    searchCustomerProjects,
    searchVendorCompanies,
    
    login
};

