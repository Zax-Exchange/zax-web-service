const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "postgres",
  },
  stage: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.STAGE_RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.PROD_RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "postgres",
  },
};
