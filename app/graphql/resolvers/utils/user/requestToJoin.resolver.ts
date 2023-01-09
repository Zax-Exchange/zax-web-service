import { REQUEST_TO_JOIN_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import { RequestToJoinInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import ErrorUtils from "../../../../utils/ErrorUtils";

const requestToJoin = async (
  parent: any,
  { data }: { data: RequestToJoinInput },
  context: any
) => {
  const { companyName, email } = data;
  try {
    const [company, user] = await Promise.all([
      sequelize.models.companies.findOne({
        where: {
          name: companyName,
        },
      }),
      sequelize.models.users.findOne({ where: { email } }),
    ]);

    if (user) {
      throw ErrorUtils.duplicateEmailError();
    }

    if (!company) {
      throw ErrorUtils.notFoundError();
    }

    const companyId = company.get("id") as string;

    const found = await sequelize.models.pending_join_requests.findOne({
      where: {
        companyId,
        email,
      },
    });

    // user has already requested to join.
    if (found) {
      throw ErrorUtils.duplicateEmailError();
    }

    await sequelize.models.pending_join_requests.create({
      id: uuidv4(),
      companyId,
      email,
    });

    const allAdmins = await CompanyApiUtils.getAllCompanyAdmins(companyId);
    NotificationService.sendNotification(REQUEST_TO_JOIN_ROUTE, {
      data: {
        message: "app.notification.company.newJoinRequest",
      },
      receivers: allAdmins,
    });

    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    requestToJoin,
  },
};
