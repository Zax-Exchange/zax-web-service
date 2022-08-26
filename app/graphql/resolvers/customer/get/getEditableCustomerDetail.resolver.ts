import CompanyApiUtils from "../../../../utils/companyUtils";
import { EditableCustomerDetail } from "../../../resolvers-types.generated";

/* Gets editable customer detail for company admins to update in settings page */
const getEditableCustomerDetail = async (
  parent: any,
  { companyId }: { companyId: string },
  context: any
) => {
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
    } as EditableCustomerDetail;
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getEditableCustomerDetail,
  },
};
