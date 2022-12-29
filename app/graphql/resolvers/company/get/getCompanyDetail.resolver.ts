import CompanyApiUtils from "../../../../utils/companyUtils";
import {
  CustomerDetail,
  GetCompanyDetailInput,
  VendorDetail,
} from "../../../resolvers-types.generated";

const getCompanyDetail = async (
  parent: any,
  { data }: { data: GetCompanyDetailInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);

    if (company.isVendor) {
      const vendor = await CompanyApiUtils.getVendorWithCompanyId(companyId);
      return {
        ...company,
        ...vendor,
        productsAndMoq: JSON.parse(vendor.productsAndMoq),
      } as VendorDetail;
    } else {
      const customer = await CompanyApiUtils.getCustomerWithCompanyId(
        companyId
      );
      return {
        ...company,
        ...customer,
      } as CustomerDetail;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCompanyDetail,
  },
};
