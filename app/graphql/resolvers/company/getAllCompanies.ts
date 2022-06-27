import { getAllCompanies as getAllCompaniesApi } from "../../../api/company/companyApis";

const getAllCompanies = () => {
  return getAllCompaniesApi();
};

export default getAllCompanies;