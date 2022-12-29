import CompanyApiUtils from "../../../../utils/companyUtils";
import {
  GetVendorDetailInput,
  ProductAndMoq,
  VendorDetail,
} from "../../../resolvers-types.generated";

const getVendorDetail = async (
  parent: any,
  { data }: { data: GetVendorDetailInput },
  context: any
): Promise<VendorDetail | null> => {
  const { companyId } = data;
  try {
    const [company, vendor] = await Promise.all([
      CompanyApiUtils.getCompanyWithCompanyId(companyId),
      CompanyApiUtils.getVendorWithCompanyId(companyId),
    ]);
    if (!company || !vendor) return null;

    const { locations, productsAndMoq, leadTime } = vendor;
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
      locations,
      productsAndMoq: JSON.parse(productsAndMoq) as ProductAndMoq[],
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
