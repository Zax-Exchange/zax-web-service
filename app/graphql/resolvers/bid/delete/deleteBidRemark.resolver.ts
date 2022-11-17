import s3 from "../../../../aws/s3";
import { bid_remarks } from "../../../../models/bid_remarks";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeleteBidRemarkInput } from "../../../resolvers-types.generated";

const deleteBidRemark = async (
  _parent: any,
  { data }: { data: DeleteBidRemarkInput }
) => {
  try {
    const { fileId } = data;

    const fileToDelete = (await sequelize.models.bid_remarks.findByPk(
      fileId
    )) as bid_remarks;

    await sequelize.models.bid_remarks.destroy({
      where: {
        id: fileId,
      },
    });

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_S3_VENDOR_FILES_BUCKET!}/${
          process.env.AWS_S3_BID_REMARKS_FOLDER
        }`,
        Key: fileId,
      })
      .promise();

    if (fileToDelete !== null && fileToDelete.projectId !== null) {
      await cacheService.invalidateProjectInCache(fileToDelete.projectId!);
    }
    return true;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    deleteBidRemark,
  },
};
