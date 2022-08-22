import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../utils/companyUtils";
import { company_plansAttributes } from "../models/company_plans";
import { plansAttributes } from "../models/plans";
import { stripe } from "../plan/createSubscriptionsApis";
import { CustomerDetail, VendorDetail } from "../../graphql/resolvers-types";

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

// company public view
const getVendorDetail = async (companyId: string): Promise<VendorDetail> => {
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const vendor = await CompanyApiUtils.getVendorWithCompanyId(companyId);
    const { moq, locations, materials, leadTime } = vendor;
    const {
      id,
      name,
      contactEmail,
      logo,
      phone,
      fax,
      country,
      isActive,
      isVerified,
      companyUrl,
    } = company;
    const res = {
      id,
      name,
      contactEmail,
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
  } catch (e) {
    return Promise.reject(e);
  }
};

const getCustomerDetail = async (
  companyId: string
): Promise<CustomerDetail> => {
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const customer = await CompanyApiUtils.getCustomerWithCompanyId(companyId);

    const {
      id,
      name,
      contactEmail,
      logo,
      phone,
      fax,
      country,
      isActive,
      isVerified,
      companyUrl,
    } = company;
    const res = {
      id,
      name,
      contactEmail,
      logo,
      country,
      phone,
      fax,

      isVerified,
      isActive,
      companyUrl,
    };
    return res;
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

export {
  getCompanyDetail,
  getCustomerDetail,
  getVendorDetail,
  getCompanyPlanDetail,
};
