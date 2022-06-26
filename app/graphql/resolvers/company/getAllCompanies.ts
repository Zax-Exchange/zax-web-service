import { getAllCompanies as getAllCompaniesApi } from "../../../api/company/companyApis.js";

const getAllCompanies = () => {
  return getAllCompaniesApi();
};

export default getAllCompanies;