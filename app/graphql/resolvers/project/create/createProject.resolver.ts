import sequelize from "../../../../postgres/dbconnection";
import {
  CreateProjectInput,
  ProjectPermission,
  ProjectStatus,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import createProjectComponents from "./createProjectComponents";
import createOrUpdateProjectPermission from "./createOrUpdateProjectPermission";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";

const createProject = async (
  parent: any,
  { data }: { data: CreateProjectInput },
  context: any,
  info: any
) => {
  const projects = sequelize.models.projects;
  const users = sequelize.models.users;
  const {
    userId,
    creationMode,
    name,
    category,
    totalWeight,
    deliveryDate,
    deliveryAddress,
    targetPrice,
    orderQuantities,
    components,
    comments,
  } = data;
  try {
    const projectId = uuidv4();
    const products: string[] = [];

    await sequelize.transaction(async (transaction) => {
      const user = await users.findByPk(userId, {
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      await projects.create(
        {
          id: projectId,
          userId,
          creationMode,
          name,
          deliveryDate,
          deliveryAddress,
          category,
          totalWeight,
          targetPrice,
          orderQuantities,
          companyId,
          comments,
          status: ProjectStatus.Open,
        },
        { transaction }
      );

      for (let comp of components) {
        products.push(comp.componentSpec.productName);
      }

      await Promise.all([
        createProjectComponents(projectId, components, transaction),
        createOrUpdateProjectPermission(
          { userIds: [userId], projectId, permission: ProjectPermission.Owner },
          transaction
        ),
      ]);
    });

    ElasticProjectService.createProjectDocument({
      userId,
      projectId,
      category,
      deliveryDate,
      deliveryAddress,
      targetPrice,
      orderQuantities,
      products,
    });

    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createProject,
  },
};
