import sequelize from "../../postgres/dbconnection";
import * as commonPlanTypes from "../types/common/planTypes";
import { Transaction } from "sequelize/types";
import { plansAttributes } from "../models/plans";
import { company_plans } from "../models/company_plans";
import { stripe } from "./createSubscriptionsApis";
import { companies } from "../models/companies";
import { stripeTimeToUTC } from "../utils/timeUtils";

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

const getCompanyPlanWithCompanyId = async (companyId: string): Promise<commonPlanTypes.CompanyPlanDetail> => {
  try {
    const companyPlan = await sequelize.models.company_plans.findOne({
      where: {
        companyId
      }
    }) as company_plans;
    
    const [plan, subId] = await Promise.all([
      companyPlan.getPlan().then(p => p.get({ plain:true }) as plansAttributes),
      companyPlan.getStripe_customer().then(cus => cus.get("subscriptionId") as string)
    ])

    const sub = await stripe.subscriptions.retrieve(subId, {
      "expand": ["plan"]
    });


    const res = {
      tier: plan.tier,
      price: sub.items.data[0].plan.amount! / 100,
      billingFrequency: sub.items.data[0].plan.interval,
      memberSince: stripeTimeToUTC(sub.start_date)!,
      subscriptionStartDate: stripeTimeToUTC(sub.current_period_start)!,
      subscriptionEndDate: stripeTimeToUTC(sub.current_period_end)!,
      trialStartDate: stripeTimeToUTC(sub.trial_start),
      trialEndDate: stripeTimeToUTC(sub.trial_end)
    }

    return res;
  } catch (error) {

    return Promise.reject(error) 
  }
}

export {
  getPlanWithPlanId,
  getCompanyPlanWithCompanyId,
  getAllPlans
}