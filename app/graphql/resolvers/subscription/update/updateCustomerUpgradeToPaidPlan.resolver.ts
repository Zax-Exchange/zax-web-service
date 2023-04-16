import e from "express";
import { company_plans } from "../../../../db/models/company_plans";
import { stripe_customers } from "../../../../db/models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import {
  CompanyPlanType,
  UpdateCustomerUpgradeToPaidPlanInput,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

const updateCustomerUpgradeToPaidPlan = async (
  parent: any,
  { data }: { data: UpdateCustomerUpgradeToPaidPlanInput },
  context: any
) => {
  const { companyId } = data;

  // TODO: refactor this so we don't use hardcoded plan id
  let PLAN_ID = "12516729-143f-4fde-b842-c2f93fdf7d7e";
  if (process.env.NODE_ENV === "production") {
    PLAN_ID = "d7e075ef-ecb2-4d94-ac0d-20765f1e18fb";
  } else if (process.env.NODE_ENV === "stage") {
    PLAN_ID = "0f6fd0a3-70c7-4154-a490-b077761d1cf3";
  }

  try {
    const stripeCustomerInstanceInZax =
      (await sequelize.models.stripe_customers.findOne({
        where: {
          companyId,
        },
      })) as stripe_customers;
    const existingCompanyPlanInstance =
      (await sequelize.models.company_plans.findOne({
        where: {
          companyId,
        },
      })) as company_plans;
    if (existingCompanyPlanInstance) {
      // for users that previously cancelled their plans
      await existingCompanyPlanInstance.update({
        planType: CompanyPlanType.Paid,
      });
    } else {
      await sequelize.models.company_plans.create({
        id: uuidv4(),
        planId: PLAN_ID,
        companyId,
        stripeCustomerId: stripeCustomerInstanceInZax.id,
        planType: CompanyPlanType.Paid,
      });
    }
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    updateCustomerUpgradeToPaidPlan,
  },
};
