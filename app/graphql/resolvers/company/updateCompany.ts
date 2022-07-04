import * as updatePlanTypes from "../../../types/update/planTypes";
import * as updateCompanyTypes from "../../../types/update/companyTypes";
import { 
  updateCompany as updateCompanyApi,
  updateCompanyPlan as updateCompanyPlanApi
 } from "../../../api/company/updateCompanyApis";

const updateCompany = (parents: any, args: Record<string, updateCompanyTypes.UpdateCompanyInput>, context: any) => {
  return updateCompanyApi(args.data);
};

const updateCompanyPlan = (parents: any, args: Record<string, updatePlanTypes.UpdateCompanyPlanInput>, context: any) => {
  return updateCompanyPlanApi(args.data);
};

export {
  updateCompany,
  updateCompanyPlan
};