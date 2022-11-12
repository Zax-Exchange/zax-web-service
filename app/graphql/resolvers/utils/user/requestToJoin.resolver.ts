import { REQUEST_TO_JOIN_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import { RequestToJoinInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

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
      throw new Error("Existing user");
    }

    if (!company) {
      throw new Error("Could not find company");
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
      throw new Error("Duplicate requests");
    }

    await sequelize.models.pending_join_requests.create({
      id: uuidv4(),
      companyId,
      email,
    });

    const allAdmins = await CompanyApiUtils.getAllCompanyAdmins(companyId);
    NotificationService.sendNotification(REQUEST_TO_JOIN_ROUTE, {
      data: {
        message:
          "There's a new request to join your company. Click here to view.",
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
