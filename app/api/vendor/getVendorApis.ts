import { VendorDetail } from "../../graphql/resolvers-types.generated";
import CompanyApiUtils from "../utils/companyUtils";

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

export { getVendorDetail };
