import { projects, projectsAttributes } from "../../../../models/projects";
import { purchase_orders } from "../../../../models/purchase_orders";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CustomerPo,
  CustomerPoDetail,
  CustomerProject,
  CustomerProjectOverview,
  GetCustomerPosInput,
  GetCustomerProjectsInput,
  ProjectPermission,
} from "../../../resolvers-types.generated";

const getCustomerPos = async (
  parent: any,
  { data }: { data: GetCustomerPosInput },
  context: any
): Promise<CustomerPo[]> => {
  const { userId } = data;
  try {
    const projectPermissions = await ProjectApiUtils.getProjectPermissions(
      userId
    );

    const res: (CustomerPo | null)[] = await Promise.all(
      projectPermissions.map(async (permission) => {
        const project = (await sequelize.models.projects.findByPk(
          permission.projectId
        )) as projects;
        const bids = await project.getProject_bids();

        const poDetails: (CustomerPoDetail | null)[] = await Promise.all(
          bids.map(async (bid) => {
            const vendorDetail = await CompanyApiUtils.getCompanyWithCompanyId(
              bid.companyId
            );
            const [poFile, invoiceFile] = await Promise.all([
              sequelize.models.purchase_orders.findOne({
                where: {
                  projectId: project.id,
                  projectBidId: bid.id,
                },
              }),
              sequelize.models.invoices.findOne({
                where: {
                  projectId: project.id,
                  projectBidId: bid.id,
                },
              }),
            ]);
            if (!poFile) return null;

            return {
              projectBidId: bid.id,
              vendorInfo: {
                companyId: vendorDetail.id,
                companyName: vendorDetail.name,
              },
              poFile: {
                fileId: poFile.get("id"),
                filename: poFile.get("fileName"),
                status: poFile.get("status"),
                url: `${process.env.AWS_CDN_URL}/${
                  process.env.AWS_S3_PURCHASE_ORDERS_FOLDER
                }/${poFile.get("id")}`,
              },
              invoiceFile: invoiceFile
                ? {
                    fileId: invoiceFile.get("id"),
                    filename: invoiceFile.get("fileName"),
                    status: invoiceFile.get("status"),
                    url: `${process.env.AWS_CDN_URL}/${
                      process.env.AWS_S3_INVOICES_FOLDER
                    }/${poFile.get("id")}`,
                  }
                : null,
            } as CustomerPoDetail;
          })
        );

        return {
          projectInfo: {
            projectId: project.id,
            projectName: project.name,
          },
          poDetails: poDetails.filter((detail) => !!detail),
          permission: permission.permission,
        } as CustomerPo;
      })
    );

    return res.filter((p) => !!p?.poDetails.length) as CustomerPo[];
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCustomerPos,
  },
};
