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
      const factories = await CompanyApiUtils.getVendorFactoriesWithCompanyId(
        companyId
      );
      return {
        ...company,
        factories: factories.map((fact) => {
          return {
            ...fact,
            factoryProductsDetail: JSON.parse(fact.factoryProductsDetail),
          };
        }),
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
