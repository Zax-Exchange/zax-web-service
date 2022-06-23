const pool = require("../dbconnection");
const query = require("../sql/queries/company/getAllCompanies");

const getAllCompanies = () => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, function (error, results, fields) {
        if (error) throw error;

        if (results) {
          connection.release();
          res(results);
        }
        
      });
    })
  });

module.exports = getAllCompanies;