import pool from "../dbconnection.js";
import getAllComaniesQuery from "../sql/queries/company/getAllCompanies.js";

const getAllCompanies = () => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(getAllComaniesQuery, function (error, results, fields) {
        if (error) throw error;

        if (results) {
          connection.release();
          res(results);
        }
        
      });
    })
  });

export { 
  getAllCompanies
};