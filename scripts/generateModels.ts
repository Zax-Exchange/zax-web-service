import SequelizeAuto from "sequelize-auto";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
process.env.NODE_ENV = "test";

const port = parseInt(process.env.RDS_PORT || "5432");
let name = process.env.TEST_RDS_NAME;
if (process.env.NODE_ENV === "development") {
  name = process.env.RDS_NAME
}
const auto = new SequelizeAuto(name!, process.env.RDS_USERNAME!, process.env.RDS_PASSWORD!, {
  port: port,
  host: process.env.RDS_HOSTNAME,
  dialect: "postgres",
  directory: "app/api/models",
  singularize: false,
  useDefine: true,
  lang: "ts",
  caseModel: "l"
});

auto.run()