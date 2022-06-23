const createUserApi = require("../../../api/user/createUser");

const createUser = (parent, args, context) => {
  return createUserApi(args);
};

module.exports = createUser;