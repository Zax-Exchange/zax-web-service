import { CustomerDetail } from "../../graphql/resolvers-types.generated";
import CompanyApiUtils from "../utils/companyUtils";

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

export { getCustomerDetail };
