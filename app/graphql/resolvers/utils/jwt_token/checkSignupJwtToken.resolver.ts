import sequelize from "../../../../postgres/dbconnection";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorUtils from "../../../../utils/ErrorUtils";
import { CheckSignupJwtTokenInput } from "../../../resolvers-types.generated";

const checkSignupJwtToken = async (
  parent: any,
  { data }: { data: CheckSignupJwtTokenInput },
  context: any
) => {
  let decodedJwt;
  const { token } = data;

  try {
    decodedJwt = jwt.verify(
      token,
      process.env.USER_SIGNUP_TOKEN_SECRET!
    ) as JwtPayload;

    // check if token expired, or has specified fields
    if (decodedJwt.exp && decodedJwt.exp * 1000 < Date.now()) {
      return false;
    } else if (!decodedJwt.id || !decodedJwt.companyId) {
      return false;
    }
    const tokenInstance = await sequelize.models.expiring_jwt_tokens.findByPk(
      decodedJwt.id
    );
    console.log(tokenInstance);
    if (tokenInstance) return true;

    // if not found, that means the token has been used and deleted
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    checkSignupJwtToken,
  },
};
