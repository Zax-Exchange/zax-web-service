import sequelize from "../../postgres/dbconnection";
import * as commonPlanTypes from "../types/common/planTypes";
import { Transaction } from "sequelize/types";

const getPlanWithPlanId = async (id: string, transaction?: Transaction): Promise<commonPlanTypes.Plan> => {
  const plans = sequelize.models.plans;
  try {
    return await plans.findByPk(id, {transaction}).then(p => p?.get({ plain:true }));
  } catch(e) {
    return Promise.reject(e);
  }
};

const getAllPlans = async (): Promise<commonPlanTypes.Plan[]> => {
  const plans = sequelize.models.plans;
  try {
    return await plans.findAll().then(ps => ps.map(p => p.get({ plain:true })));
  } catch(e) {
    return Promise.reject(e);
  }
}

export {
  getPlanWithPlanId,
  getAllPlans
}