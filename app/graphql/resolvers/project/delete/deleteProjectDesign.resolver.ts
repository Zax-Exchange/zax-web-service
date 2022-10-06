import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteProjectDesignInput } from "../../../resolvers-types.generated";

const deleteProjectDesign = async (
  _parent: any,
  { data }: { data: DeleteProjectDesignInput }
) => {
  try {
    const { designId } = data;

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
