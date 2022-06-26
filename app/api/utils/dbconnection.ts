import postgres from "postgres";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = parseInt(process.env.RDS_PORT || "4000");

const sql = postgres({
  hostname : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : port,
  db : process.env.RDS_NAME
});

export default sql;