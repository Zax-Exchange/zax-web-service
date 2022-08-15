import AWS from "aws-sdk";

export const bucket = "zax-exchange-project-designs";

export const s3 = new AWS.S3({
  endpoint: "http://zax-exchange-project-designs.s3-website-us-east-1.amazonaws.com",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sslEnabled: false,
  s3ForcePathStyle: true,
});
