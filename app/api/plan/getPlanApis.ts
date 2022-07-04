import sequelize from "../utils/dbconnection";
import * as commonPlanTypes from "../../types/common/planTypes";
import { Transaction } from "sequelize/types";

const getPlanWithPlanId = async (id: number, transaction?: Transaction): Promise<commonPlanTypes.Plan> => {
  const plans = sequelize.models.plans;
  try {
    const plan = await plans.findByPk(id, {transaction}).then(p => p?.get({ plain:true }));
    return plan
  } catch(e) {
    return Promise.reject(e);
  }
};


export {
  getPlanWithPlanId
}