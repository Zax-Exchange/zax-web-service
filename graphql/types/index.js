const appNews = require("./appNews/appNews");
const user = require("./user/user");
const project = require("./project/project");
const company = require("./company/company");
const query = require("./query");
const mutation = require("./mutation");

module.exports = [query, user, company, mutation];