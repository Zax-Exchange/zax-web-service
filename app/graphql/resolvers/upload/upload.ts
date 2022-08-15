import { ApolloError } from "apollo-server-express";
import { createUploadStream } from "../../../aws/streams";

export const uploadFile = async (_parent: any, { file }: any) => {
  console.log({ file })
  const { createReadStream, filename, mimetype, encoding } = await file;

  const stream = createReadStream();

  let result;

  try {
    const uploadStream = createUploadStream(filename);
    stream.pipe(uploadStream.writeStream);
    result = await uploadStream.promise;
  } catch (error: any) {
    console.log(
      `[Error]: Message: ${error.message}, Stack: ${error.stack}`
    );
    throw new ApolloError("Error uploading file");
  }

  return result
}
