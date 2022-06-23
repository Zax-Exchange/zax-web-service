const pool = require("../dbconnection");
const queryTemplate = require("../sql/queries/user/createUser");

const createUser = ({createUserInput: data}) => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        rej(err)
      }

      const variables = [data.name, data.email, data.companyId, data.isAdmin, data.password]
      connection.query(queryTemplate, variables, function (error, results, fields) {
        if (error) rej(error);

        if (results) {
          connection.release();
          res(true);
        }
        
      });
    })
  });

module.exports = createUser;