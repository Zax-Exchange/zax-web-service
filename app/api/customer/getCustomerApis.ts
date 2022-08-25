import {
  CustomerDetail,
  EditableCustomerDetail,
} from "../../graphql/resolvers-types.generated";
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

const getEditableCustomerDetail = async (
  companyId: string
): Promise<EditableCustomerDetail> => {
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
      name,
      contactEmail,
      logo,
      country,
      phone,
      fax,
      companyUrl,
    };
    console.log({ res });
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { getCustomerDetail, getEditableCustomerDetail };
