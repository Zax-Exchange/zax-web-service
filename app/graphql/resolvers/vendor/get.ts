import { getVendorDetail as getVendorDetailApi } from "../../../api/vendor/getVendorApis";
const getVendorDetail = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getVendorDetailApi(args.companyId);
};

export default {
  Query: {
    getVendorDetail,
  },
};
