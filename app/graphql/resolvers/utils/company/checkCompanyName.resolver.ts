import CompanyApiUtils from "../../../../utils/companyUtils";
import { CheckCompanyNameInput } from "../../../resolvers-types.generated";

const checkCompanyName = (
  parents: any,
  { data }: { data: CheckCompanyNameInput },
  context: any
) => {
  const { companyName } = data;
  return CompanyApiUtils.checkCompanyName(companyName);
};

export default {
  Query: {
    checkCompanyName,
  },
};
