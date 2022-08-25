import sequelize from "../../postgres/dbconnection";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import { v4 as uuidv4 } from "uuid";
import {
  CreateCustomerInput,
  CreateVendorInput,
} from "../../graphql/resolvers-types.generated";

// const createCompanyLogo = async ()

export {};
