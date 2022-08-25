import { ApolloError } from "apollo-server-express";
// import { createUploadStream } from "../../../aws/streams";
import { v4 as uuidv4 } from "uuid";
import { createProjectDesign } from "../../../api/project/createProjectApis";
import s3 from "../../../aws/s3";

const uploadProjectDesign = async (_parent: any, { file }: any) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  try {
    const Key = uuidv4();
    await s3
      .upload({
        Body: stream,
        Key,
        ContentType: mimetype,
        Bucket: process.env.AWS_PROJECT_DESIGNS_BUCKET!,
      })
      .promise();
    return await createProjectDesign(Key, filename);
  } catch (error: any) {
    throw new ApolloError("Error uploading file");
  }
};

// export const uploadCompanyLogo = async (_parent: any, { file }: any) => {
//   const { createReadStream, filename, mimetype, encoding } = await file;
//   const stream = createReadStream();

//   try {
//     const Key = uuidv4();
//     const { Location } = await s3
//       .upload({
//         Body: stream,
//         Key,
//         ContentType: mimetype,
//         Bucket: process.env.AWS_COMPANY_LOGO_BUCKET!,
//       })
//       .promise();
//     return await createCompanyLogo(Key, Location);
//   } catch (error: any) {
//     throw new ApolloError("Error uploading file");
//   }
// };

export default {
  Mutation: {
    uploadProjectDesign,
  },
};
