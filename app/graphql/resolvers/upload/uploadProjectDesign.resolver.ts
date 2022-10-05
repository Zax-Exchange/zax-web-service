import { ApolloError } from "apollo-server-express";
// import { createUploadStream } from "../../../aws/streams";
import { v4 as uuidv4 } from "uuid";
import s3 from "../../../aws/s3";
import sequelize from "../../../postgres/dbconnection";
import { UploadProjectDesignResponse } from "../../resolvers-types.generated";

const uploadProjectDesign = async (_parent: any, { file }: any) => {
  try {
    const resolvedFile = await file;
    const { createReadStream, filename, mimetype, encoding } =
      resolvedFile.file;
    const stream = createReadStream();
    const designId = uuidv4();
    await s3
      .upload({
        Body: stream,
        Key: designId,
        ContentType: mimetype,
        Bucket: process.env.AWS_PROJECT_DESIGNS_BUCKET!,
      })
      .promise();
    await sequelize.models.project_designs.create({
      id: designId,
      fileName: filename,
    });

    return {
      designId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${designId}`,
    } as UploadProjectDesignResponse;
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
