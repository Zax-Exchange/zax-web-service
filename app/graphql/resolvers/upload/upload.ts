import { ApolloError } from "apollo-server-express";
// import { createUploadStream } from "../../../aws/streams";
import { v4 as uuidv4 } from "uuid";
import { createProjectDesign } from "../../../api/project/createProjectApis";
import s3 from "../../../aws/s3"

export const uploadProjectDesign = async (_parent: any, { file }: any) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  let result;

  try {
    const { Location } = await s3
      .upload({
        Body: stream,
        Key: uuidv4(),
        ContentType: mimetype,
        Bucket: process.env.AWS_PROJECT_DESIGNS_BUCKET!,
      })
      .promise();
    return await createProjectDesign(Location);
  } catch (error: any) {
    throw new ApolloError("Error uploading file");
  }
};
