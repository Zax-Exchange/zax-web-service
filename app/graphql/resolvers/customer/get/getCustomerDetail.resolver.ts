import CompanyApiUtils from "../../../../utils/companyUtils";
import { GetCustomerDetailInput } from "../../../resolvers-types.generated";

const getCustomerDetail = async (
  parent: any,
  { data }: { data: GetCustomerDetailInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    // customer not used as there are currently no additional attributes
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

export default {
  Query: {
    getCustomerDetail,
  },
};
