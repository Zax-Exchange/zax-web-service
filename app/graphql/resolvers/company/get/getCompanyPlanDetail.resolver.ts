import { company_plans } from "../../../../db/models/company_plans";
import { plansAttributes } from "../../../../db/models/plans";
import sequelize from "../../../../postgres/dbconnection";
import { stripeTimeToUTC } from "../../../../utils/timeUtils";
import {
  CompanyPlanDetail,
  GetCompanyDetailInput,
} from "../../../resolvers-types.generated";
import stripeService from "../../../../stripe/StripeService";

const getCompanyPlanDetail = async (
  parent: any,
  { data }: { data: GetCompanyDetailInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const companyPlan = (await sequelize.models.company_plans.findOne({
      where: {
        companyId,
      },
    })) as company_plans;

    if (!companyPlan) return null;

    const [plan, subId] = await Promise.all([
      companyPlan
        .getPlan()
        .then((p) => p.get({ plain: true }) as plansAttributes),
      companyPlan
        .getStripe_customer()
        .then((cus) => cus.get("subscriptionId") as string),
    ]);

    const sub = await stripeService.getSubscription(subId);

    const res = {
      tier: plan.tier,
      price: sub.items.data[0].plan.amount! / 100,
      billingFrequency: sub.items.data[0].plan.interval,
      memberSince: stripeTimeToUTC(sub.start_date)!,
      subscriptionStartDate: stripeTimeToUTC(sub.current_period_start)!,
      subscriptionEndDate: stripeTimeToUTC(sub.current_period_end)!,
    } as CompanyPlanDetail;

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getCompanyPlanDetail,
  },
};
