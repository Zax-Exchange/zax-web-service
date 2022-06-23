const pool = require("../dbconnection");
const queryTemplate = require("../sql/queries/user/updateUser");

const createUser = ({updateUserInput: data}) => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err
      }

      const variables = [data.name, data.email, data.id]
      connection.query(queryTemplate, variables, function (error, results, fields) {
        if (error) throw error

        if (results) {
          connection.release();
          
          res(true);
        }
        
      });
    })
  });

module.exports = createUser;