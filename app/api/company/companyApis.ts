import sql from "../utils/dbconnection.js";

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