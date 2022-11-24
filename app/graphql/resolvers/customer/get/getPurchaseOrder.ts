import { projects, projectsAttributes } from "../../../../models/projects";
import { project_bids } from "../../../../models/project_bids";
import { purchase_orders } from "../../../../models/purchase_orders";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CustomerPo,
  CustomerPoDetail,
  CustomerProject,
  CustomerProjectOverview,
  GetCustomerProjectsInput,
  GetPurchaseOrderInput,
  ProjectPermission,
  PurchaseOrder,
} from "../../../resolvers-types.generated";

const getPurchaseOrder = async (
  parent: any,
  { data }: { data: GetPurchaseOrderInput },
  context: any
): Promise<PurchaseOrder | null> => {
  const { projectId, projectBidId } = data;
  try {
    const poFile = (await sequelize.models.purchase_orders.findOne({
      where: {
        projectId: projectId,
        projectBidId: projectBidId,
      },
    })) as purchase_orders;

    if (poFile) {
      return {
        fileId: poFile.id,
        filename: poFile.fileName,
        url: poFile.url,
        status: poFile.status,
      };
    }
    return null;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getPurchaseOrder,
  },
};
