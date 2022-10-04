import CompanyApiUtils from "../../../../utils/companyUtils";
import { GetVendorDetailInput } from "../../../resolvers-types.generated";

const getVendorDetail = async (
  parent: any,
  { data }: { data: GetVendorDetailInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const [company, vendor] = await Promise.all([
      CompanyApiUtils.getCompanyWithCompanyId(companyId),
      CompanyApiUtils.getVendorWithCompanyId(companyId),
    ]);
    if (!company || !vendor) return null;
    const { moq, locations, products, leadTime } = vendor;
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
      products,
      companyUrl,
    };
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getVendorDetail,
  },
};
