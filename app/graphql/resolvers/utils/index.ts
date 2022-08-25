import CompanyApiUtils from "../../../api/utils/companyUtils";
import { checkUserEmail as checkUserEmailApi } from "../../../api/subscription/createSubscriptionsApis";
import { inviteUser as inviteUserApi } from "../../../api/user/inviteUserApis";
const inviteUser = (
  parent: any,
  { email, userId }: { email: string; userId: string },
  context: any
) => {
  return inviteUserApi(email, userId);
};

const checkCompanyName = (
  parents: any,
  { name }: { name: string },
  context: any
) => {
  return CompanyApiUtils.checkCompanyName(name);
};

const checkUserEmail = (
  parent: any,
  { email }: { email: string },
  context: any
) => {
  return checkUserEmailApi(email);
};

export default {
  Query: {
    checkCompanyName,
    checkUserEmail,
  },
  Mutation: {
    inviteUser,
  },
};
