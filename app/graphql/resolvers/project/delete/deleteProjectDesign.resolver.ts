import s3 from "../../../../aws/s3";
import { project_designs } from "../../../../models/project_designs";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeleteProjectDesignInput } from "../../../resolvers-types.generated";

const deleteProjectDesign = async (
  _parent: any,
  { data }: { data: DeleteProjectDesignInput }
) => {
  try {
    const { fileId } = data;

    const valueToDelete = (await sequelize.models.project_designs.findByPk(
      fileId
    )) as project_designs | null;
    await sequelize.models.project_designs.destroy({
      where: {
        id: fileId,
      },
    });

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_S3_CUSTOMER_FILES_BUCKET!}/${
          process.env.AWS_S3_COMPONENT_DESIGNS_FOLDER
        }`,
        Key: fileId,
      })
      .promise();

    if (valueToDelete !== null && valueToDelete.projectId !== null) {
      await cacheService.invalidateProjectInCache(valueToDelete.projectId!);
    }
    return true;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    deleteProjectDesign,
  },
};
