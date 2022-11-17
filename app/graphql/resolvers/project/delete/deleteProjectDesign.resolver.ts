import s3 from "../../../../aws/s3";
import { project_designs } from "../../../../models/project_designs";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeleteProjectDesignInput } from "../../../resolvers-types.generated";

export const deleteProjectDesign = async (
  _parent: any,
  { data }: { data: DeleteProjectDesignInput }
) => {
  try {
    const { designId } = data;

    const valueToDelete = await sequelize.models.project_designs.findByPk(designId) as project_designs | null;
    await sequelize.models.project_designs.destroy({
      where: {
        id: designId,
      },
    });

    await s3
      .deleteObject({
        Bucket: process.env.AWS_PROJECT_DESIGNS_BUCKET!,
        Key: designId,
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
