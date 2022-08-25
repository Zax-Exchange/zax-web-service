import {
  getCompanyDetail as getCompanyDetailApi,
  getCompanyPlanDetail as getCompanyPlanDetailApi,
} from "../../../api/company/getCompanyApis";

const getCompanyDetail = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getCompanyDetailApi(args.companyId);
};

const getCompanyPlanDetail = (
  parent: any,
  { companyId }: { companyId: string },
  context: any
) => {
  return getCompanyPlanDetailApi(companyId);
};

export default {
  Query: { getCompanyDetail, getCompanyPlanDetail },
};
