import sequelize from "../utils/dbconnection";
import * as updateCompanyTypes from "../../types/update/companyTypes";
import * as commonPlanTyes from "../../types/common/planTypes";
import * as updatePlanTypes from "../../types/update/planTypes";
import CompanyApiUtils from "./utils";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import { Transaction } from "sequelize/types";
import UserApiUtils from "../user/utils";

const updateCompany = async (data: updateCompanyTypes.UpdateCompanyInput) => {
  const companies = sequelize.models.companies;
  const id = data.id;
  const userId = data.userId;

  try {
    const isAdmin = await UserApiUtils.isUserAdmin(userId);

    if (!isAdmin) {
      throw new Error("Permission denied")
    }
    await companies.update(data.data, {
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

const decreaseCompanyQuota = async (companyId: number, remainingQuota: number, transaction?: Transaction) => {
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
    const p = await company_plans.findOne({ where: {companyId}}).then(c => c?.get());
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
};

export {
  updateCompany,
  updateCompanyPlan,
  decreaseCompanyQuota
}