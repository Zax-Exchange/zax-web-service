const updateUserApi = require("../../../api/user/updateUser");

const updateUser = (parent, args, context) => {
  return updateUserApi(args);
}

module.exports = updateUser;