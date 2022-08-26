import sequelize from "../../../../postgres/dbconnection";
import { CheckUserEmailInput } from "../../../resolvers-types.generated";

const checkUserEmail = async (
  parent: any,
  { data }: { data: CheckUserEmailInput },
  context: any
) => {
  const { email } = data;
  try {
    const customer = await sequelize.models.stripe_customers.findOne({
      where: {
        email,
      },
    });

    if (customer) return true;
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    checkUserEmail,
  },
};
