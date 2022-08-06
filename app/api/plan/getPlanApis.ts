import sequelize from "../../postgres/dbconnection";
import * as commonPlanTypes from "../types/common/planTypes";
import { Transaction } from "sequelize/types";
import { plansAttributes } from "../models/plans";

const getPlanWithPlanId = async (id: string, transaction?: Transaction) => {
  const plans = sequelize.models.plans;

  try {
    return await plans.findByPk(id, {transaction}).then(p => p?.get({ plain:true }) as plansAttributes);
  } catch(e) {
    return Promise.reject(e);
  }
};

/**
 * Returns all customer/vendor plans based on isVendor flag
 * @param isVendor 
 * @returns plansAttributes
 */
const getAllPlans = async (isVendor: boolean) => {
  const plans = sequelize.models.plans;
  try {
    return await plans.findAll({
      where: {
        isVendor
      }
    }).then(ps => ps.map(p => p.get({ plain:true })  as plansAttributes));
  } catch(e) {
    return Promise.reject(e);
  }
}


export {
  getPlanWithPlanId,
  getAllPlans
}