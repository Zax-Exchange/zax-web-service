import { ApolloError } from "apollo-server-express";
// import { createUploadStream } from "../../../aws/streams";
import { v4 as uuidv4 } from "uuid";
import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { ProjectDesign } from "../../../resolvers-types.generated";

const uploadProjectDesign = async (_parent: any, { file }: any) => {
  try {
    const resolvedFile = await file;
    const { createReadStream, filename, mimetype, encoding } =
      resolvedFile.file;
    const stream = createReadStream();
    const fileId = uuidv4();
    await s3
      .upload({
        Body: stream,
        Key: fileId,
        ContentType: mimetype,
        Bucket: `${process.env.AWS_S3_CUSTOMER_FILES_BUCKET!}/${
          process.env.AWS_S3_COMPONENT_DESIGNS_FOLDER
        }`,
      })
      .promise();
    await sequelize.models.project_designs.create({
      id: fileId,
      fileName: filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_COMPONENT_DESIGNS_FOLDER}/${fileId}`,
    });

    return {
      fileId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_COMPONENT_DESIGNS_FOLDER}/${fileId}`,
    } as ProjectDesign;
  } catch (error: any) {
    throw error;
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
