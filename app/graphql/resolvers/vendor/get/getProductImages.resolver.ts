import { vendor_product_imagesAttributes } from "../../../../db/models/vendor_product_images";
import sequelize from "../../../../postgres/dbconnection";
import {
  GenericFile,
  GetProductImagesInput,
  ProductImageFile,
} from "../../../resolvers-types.generated";

const getProductImages = async (
  parent: any,
  { data }: { data: GetProductImagesInput },
  context: any
): Promise<ProductImageFile[]> => {
  const { companyId } = data;

  try {
    const images = await sequelize.models.vendor_product_images
      .findAll({
        where: {
          companyId,
        },
      })
      .then((files) =>
        files.map(
          (file) => file.get({ plain: true }) as vendor_product_imagesAttributes
        )
      );

    return images.map((image) => ({
      fileId: image.id,
      filename: image.fileName,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_SHOWCASE_FOLDER}/${image.id}`,
      productType: image.productType!,
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProductImages,
  },
};
