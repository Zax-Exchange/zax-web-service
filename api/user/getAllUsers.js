const pool = require("../dbconnection");
const query = require("../sql/queries/user/getAllUsers");

const getAllUsers = () => new Promise((res, rej) => {
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

module.exports = getAllUsers;