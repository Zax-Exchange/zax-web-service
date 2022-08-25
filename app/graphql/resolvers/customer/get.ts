import {
  getCustomerDetail as getCustomerDetailApi,
  getEditableCustomerDetail as getEditableCustomerDetailApi,
} from "../../../api/customer/getCustomerApis";
const getCustomerDetail = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getCustomerDetailApi(args.companyId);
};

const getEditableCustomerDetail = (
  parent: any,
  { companyId }: { companyId: string },
  context: any
) => {
  console.log("@@");
  return getEditableCustomerDetailApi(companyId);
};

export default {
  Query: {
    getCustomerDetail,
    getEditableCustomerDetail,
  },
};
