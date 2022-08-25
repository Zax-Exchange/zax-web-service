import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../utils/companyUtils";
import { company_plansAttributes } from "../models/company_plans";
import { plansAttributes } from "../models/plans";
import { stripe } from "../subscription/createSubscriptionsApis";
import {
  CustomerDetail,
  VendorDetail,
} from "../../graphql/resolvers-types.generated";

// should only be called with user admin within the company
const getCompanyDetail = async (
  id: string
): Promise<VendorDetail | CustomerDetail> => {
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(id);

    if (company.isVendor) {
      const vendor = await CompanyApiUtils.getVendorWithCompanyId(id);
      return {
        ...company,
        ...vendor,
      };
    } else {
      const customer = await CompanyApiUtils.getCustomerWithCompanyId(id);
      return {
        ...company,
        ...customer,
      };
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

// TODO: finish implementation
const getCompanyPlanDetail = async (companyId: string) => {
  const company_plans = sequelize.models.company_plans;
  const plans = sequelize.models.plans;

  try {
    const companyPlan = await company_plans
      .findOne({
        where: {
          companyId,
        },
      })
      .then((plan) => plan?.get({ plain: true }) as company_plansAttributes);

    const plan = await plans
      .findByPk(companyPlan.planId)
      .then((p) => p?.get({ plain: true }) as plansAttributes);

    const subscription = await stripe.prices.retrieve(
      "price_1LSBTMEZqkVG9UR3HZhwZEsT"
    );

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { getCompanyDetail, getCompanyPlanDetail };
