const getUserApi = require("../../../api/user/getAllUsers");


const getUser = () => getUserApi()

module.exports = getUser;