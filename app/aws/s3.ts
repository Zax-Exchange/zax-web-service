import AWS from "aws-sdk";
import config from "./config";

export default new AWS.S3(config.s3);