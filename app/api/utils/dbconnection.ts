import { Sequelize } from 'sequelize-typescript'
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = parseInt(process.env.RDS_PORT || "4000");

const sequelize = new Sequelize({
  database: process.env.RDS_NAME,
  dialect: 'postgres',
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  storage: ':memory:',
  port: port,
  models: ["../models/*.ts"],
  logging: true
})




export default sequelize;