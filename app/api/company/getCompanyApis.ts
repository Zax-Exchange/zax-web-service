import sequelize from "../../postgres/dbconnection";
import * as getCompanyTypes from "../types/get/companyTypes";
import * as commonCompanyTypes from "../types/common/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import UserApiUtils from "../utils/userUtils";
import { companiesAttributes } from "../models/companies";

// should only be called with user admin within the company
const getCompanyDetail = async (id: string): Promise<commonCompanyTypes.VendorDetail | commonCompanyTypes.CustomerDetail> => {
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(id);
    
    if (company.isVendor) {
      const vendor = await CompanyApiUtils.getVendorWithCompanyId(id);
      return {
        ...company,
        ...vendor
      }
    } else {
      const customer = await CompanyApiUtils.getCustomerWithCompanyId(id);
      return {
        ...company,
        ...customer
      }
    }
  } catch(e) {
    return Promise.reject(e);
  }
};

// company public view
const getVendorDetail = async (companyId: string): Promise<commonCompanyTypes.VendorDetail> => {
try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const vendor = await CompanyApiUtils.getVendorWithCompanyId(companyId);
    const { moq, locations, materials, leadTime } = vendor;
    const { id, name, logo, phone, fax, country, isActive, isVerified, companyUrl } = company;
    const res = {
      id, 
      name, 
      logo,
      country,
      phone, 
      fax, 
      isVerified, 
      isActive,
      leadTime, 
      moq, 
      locations, 
      materials,
      companyUrl,
    };
    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};

const getCustomerDetail = async (companyId: string): Promise<commonCompanyTypes.CustomerDetail> => {
try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const customer = await CompanyApiUtils.getCustomerWithCompanyId(companyId);

    const { id, name, logo, phone, fax, country, isActive, isVerified, companyUrl } = company;
    const res = {
      id, 
      name, 
      logo,
      country,
      phone, 
      fax, 

      isVerified, 
      isActive,
      companyUrl,
    };
    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};


export {
  getCompanyDetail,
  getCustomerDetail,
  getVendorDetail
}