import * as createCompanyTypes from "../../../api/types/create/companyTypes";
import { createCompany as createCompanyApi } from "../../../api/company/createCompanyApis";

const createCompany = (parents: any, args: Record<string, createCompanyTypes.CreateCompanyInput>, context: any) => {
  return createCompanyApi(args.data);
}

export default createCompany;