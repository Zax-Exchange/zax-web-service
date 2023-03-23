import CompanyApiUtils from "../../../../utils/companyUtils";
import {
  FactoryDetail,
  FactoryProductDetail,
  GetVendorDetailInput,
  VendorDetail,
} from "../../../resolvers-types.generated";

const getVendorDetail = async (
  parent: any,
  { data }: { data: GetVendorDetailInput },
  context: any
): Promise<VendorDetail | null> => {
  const { companyId } = data;
  try {
    const [company] = await Promise.all([
      CompanyApiUtils.getCompanyWithCompanyId(companyId),
    ]);
    if (!company) return null;

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
    getVendorDetail,
  },
};
