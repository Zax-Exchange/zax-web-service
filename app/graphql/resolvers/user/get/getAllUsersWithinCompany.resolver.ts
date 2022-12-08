import { companies } from "../../../../models/companies";
import sequelize from "../../../../postgres/dbconnection";
import {
  GenericUser,
  GetAllUsersWithinCompanyInput,
  UserStatus,
} from "../../../resolvers-types.generated";

const getAllUsersWithinCompany = async (
  parent: any,
  { data }: { data: GetAllUsersWithinCompanyInput },
  context: any
) => {
  const { companyId } = data;
  const companies = sequelize.models.companies;
  try {
    const userList: GenericUser[] = await companies
      .findByPk(companyId)
      .then(async (comp) => {
        return await (comp as companies).getUsers().then((list) =>
          list.map((u) => {
            return u.get({ plain: true });
          })
        );
      });

    return userList.filter((user) => user.status === UserStatus.Active);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
export default {
  Query: {
    getAllUsersWithinCompany,
  },
};
