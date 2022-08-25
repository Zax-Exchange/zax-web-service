import {
  updateCompanyPlan as updateCompanyPlanApi,
  updateCompanyStatus as updateCompanyStatusApi,
} from "../../../api/company/updateCompanyApis";
import { UpdateCompanyPlanInput } from "../../resolvers-types.generated";

const updateCompanyPlan = (
  parents: any,
  args: Record<string, UpdateCompanyPlanInput>,
  context: any
) => {
  return updateCompanyPlanApi(args.data);
};

const updateCompanyStatus = (
  parents: any,
  { companyId, isActive }: { companyId: string; isActive: boolean },
  context: any
) => {
  return updateCompanyStatusApi(companyId, isActive);
};

export default {
  Mutation: {
    updateCompanyPlan,
    updateCompanyStatus,
  },
};
