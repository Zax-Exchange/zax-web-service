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
  VendorPo,
  VendorPoDetail,
} from "../../../resolvers-types.generated";

const getVendorPos = async (
  parent: any,
  { data }: { data: GetCustomerPosInput },
  context: any
): Promise<VendorPo[]> => {
  const { userId } = data;
  try {
    const bidPermissions = await ProjectApiUtils.getBidPermissions(userId);

    const projects = (await Promise.all(
      bidPermissions.map((p) => ProjectApiUtils.getProjectInstance(p.projectId))
    )) as projectsAttributes[];

    const projectsWithBidPermission = projects.map((p, i) => {
      return {
        ...p,
        permission: bidPermissions[i].permission,
      };
    });

    const res: (VendorPo | null)[] = await Promise.all(
      projectsWithBidPermission.map(async (project) => {
        const poDetails: (VendorPoDetail | null)[] = await Promise.all(
          bidPermissions.map(async (permission) => {
            const customerDetail =
              await CompanyApiUtils.getCompanyWithCompanyId(project.companyId);
            const [poFile, invoiceFile] = await Promise.all([
              sequelize.models.purchase_orders.findOne({
                where: {
                  projectId: project.id,
                  projectBidId: permission.projectBidId,
                },
              }),
              sequelize.models.invoices.findOne({
                where: {
                  projectId: project.id,
                  projectBidId: permission.projectBidId,
                },
              }),
            ]);
            if (!poFile) return null;

            return {
              projectBidId: permission.projectBidId,
              customerInfo: {
                companyId: customerDetail.id,
                companyName: customerDetail.name,
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
                    }/${invoiceFile.get("id")}`,
                  }
                : null,
            } as VendorPoDetail;
          })
        );

        return {
          projectInfo: {
            projectId: project.id,
            projectName: project.name,
          },
          poDetails: poDetails.filter((detail) => !!detail),
          permission: project.permission,
        } as VendorPo;
      })
    );

    return res.filter((p) => !!p?.poDetails.length) as VendorPo[];
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getVendorPos,
  },
};
