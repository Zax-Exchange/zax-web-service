import sql from "../utils/dbconnection";

//TODO: should be get all vendors/customers
const getAllCompanies = async() => {
  try {
    return await sql`select * from companies`;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { 
  getAllCompanies
};