const appNews = require('./appNews');
const user = require("./user");

const query = {
    Query: {
        appNews,
        user
    }
}

module.exports = query

