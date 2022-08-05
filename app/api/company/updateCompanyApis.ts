import sequelize from "../../postgres/dbconnection";
import * as updateCompanyTypes from "../types/update/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import * as updatePlanTypes from "../types/update/planTypes";
import CompanyApiUtils from "../utils/companyUtils";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import { Transaction } from "sequelize/types";
import UserApiUtils from "../utils/userUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";

const updateVendor = async (data: updateCompanyTypes.UpdateVendorInput) => {
  const companies = sequelize.models.companies;
  const vendors = sequelize.models.vendors;
  
  try {
    const id = data.id;
    const { name, logo, phone, fax, companyUrl, country } = data.data
    const { leadTime, moq, locations, materials } = data.data;


    await sequelize.transaction(async transaction => {
      await companies.update({ 
        name, 
        logo, 
        phone, 
        fax, 
        companyUrl, 
        country
      }, {
        where: {
          id
        },
        transaction
      });
  
      await vendors.update({
        leadTime, 
        moq, 
        locations, 
        materials
      }, {
        where: {
          companyId: id
        },
        transaction
      });
    })
    
    if (leadTime && moq && locations && materials) {
      ElasticCompanyService.updateVendorDocument({ id, leadTime, moq, locations, materials })
    }
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}

const updateCustomer = async (data: updateCompanyTypes.UpdateCustomerInput) => {
  const companies = sequelize.models.companies;
  const id = data.id;
  const { name, logo, phone, fax, companyUrl, country, isActive, isVerified } = data.data

  try {
    await companies.update({ 
      name, 
      logo, 
      phone, 
      fax, 
      companyUrl, 
      country, 
      isActive, 
      isVerified 
    }, {
      where: {
        id
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}

const updateCompanyPlan = async (data: updatePlanTypes.UpdateCompanyPlanInput) => {
  const { planId, companyId } = data;
  const company_plans = sequelize.models.company_plans;
  const plans = sequelize.models.plans;
  try {
    const newPlanQuota = await plans.findByPk(planId).then(p => p?.getDataValue("licensedUsers"));
    const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);
    const previousPlanQuota = (await getPlanWithPlanId(companyPlan.planId)).licensedUsers;

    const used = previousPlanQuota - companyPlan.remainingQuota;

    //TODO: review
    if (newPlanQuota < used) {
      throw new Error("Current licensed users exceed new plan quota.");
    }

    await company_plans.update({
      planId,
      remainingQuota: newPlanQuota - used
    }, {
      where: {
        companyId
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}

const decreaseCompanyQuota = async (companyId: string, remainingQuota: number, transaction?: Transaction) => {
  const company_plans = sequelize.models.company_plans;
  try {
    await company_plans.update({
      remainingQuota
    }, {
      where: {
        companyId
      },
      transaction
    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
};

/**
 * Updates company's isActive status
 * @param companyId 
 * @param isActive 
 * @returns boolean
 */
const updateCompanyStatus = async (companyId: string, isActive: boolean) => {

  try {
   const company = await sequelize.models.companies.findByPk(companyId);
   await company?.update({
    isActive
   });

   return true;
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  updateCustomer,
  updateVendor,
  updateCompanyPlan,
  decreaseCompanyQuota,
  updateCompanyStatus
}