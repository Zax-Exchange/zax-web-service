import CompanyApiUtils from "../../../../utils/companyUtils";
import { CheckCompanyNameInput } from "../../../resolvers-types.generated";

const checkCompanyName = async (
  parents: any,
  { data }: { data: CheckCompanyNameInput },
  context: any
) => {
  const { companyName } = data;
  return CompanyApiUtils.isDuplicateCompanyNames(companyName);
};

export default {
  Query: {
    checkCompanyName,
  },
};
