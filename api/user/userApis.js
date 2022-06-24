import pool from "../dbconnection.js";
import updateUserQuery from "../sql/queries/user/updateUser.js";
import getAllUsersQuery from "../sql/queries/user/getAllUsers.js";
import createUserQuery from "../sql/queries/user/createUser.js";

const createUser = ({updateUserInput: data}) => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err
      }

      const variables = [data.name, data.email, data.id]
      connection.query(createUserQuery, variables, function (error, results, fields) {
        if (error) throw error

        if (results) {
          connection.release();
          
          res(true);
        }
        
      });
    })
});

const updateUser = ({updateUserInput: data}) => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err
      }

      const variables = [data.name, data.email, data.id]
      connection.query(updateUserQuery, variables, function (error, results, fields) {
        if (error) throw error

        if (results) {
          connection.release();
          
          res(true);
        }
        
      });
    });
});

const getAllUsers = () => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(getAllUsersQuery, function (error, results, fields) {
        if (error) throw error;

        if (results) {
          connection.release();
          res(results);
        }
        
      });
    })
});

export {
  createUser,
  updateUser,
  getAllUsers
}