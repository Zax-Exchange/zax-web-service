import { vendor_certificationsAttributes } from "../../../../db/models/vendor_certifications";
import sequelize from "../../../../postgres/dbconnection";
import {
  FileInterface,
  GetCertificationsInput,
} from "../../../resolvers-types.generated";

const getCertifications = async (
  parent: any,
  { data }: { data: GetCertificationsInput },
  context: any
): Promise<FileInterface[]> => {
  const { companyId } = data;

  try {
    const certs = await sequelize.models.vendor_certifications
      .findAll({
        where: {
          companyId,
        },
      })
      .then((files) =>
        files.map(
          (file) => file.get({ plain: true }) as vendor_certificationsAttributes
        )
      );

    return certs.map((cert) => ({
      fileId: cert.id,
      filename: cert.fileName,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_CERT_FOLDER}/${cert.id}`,
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCertifications,
  },
};
