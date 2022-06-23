const getAllCompaniesApi = require("../../../api/company/getAllCompanies");

const getAllCompanies = () => {
  console.log("1111")
  return getAllCompaniesApi();
}

module.exports = getAllCompanies;