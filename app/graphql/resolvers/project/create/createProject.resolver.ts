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
    designIds,
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
    await sequelize.transaction(async (transaction) => {
      const user = await users.findByPk(userId, {
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const project = await projects.create(
        {
          id: uuidv4(),
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
      const projectId = project.getDataValue("id");

      // designId exists if user uploaded a project design
      if (designIds.length) {
        const [designs] = await Promise.all(
          designIds.map((designId) => {
            return sequelize.models.project_designs.findByPk(designId);
          })
        );
        for (let designId of designIds) {
          const design = await sequelize.models.project_designs.findByPk(
            designId
          );
          design?.update(
            {
              projectId,
            },
            { transaction }
          );
        }
      }

      const products = [];
      for (let comp of components) {
        products.push(comp.componentSpec.productName);
      }
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

      await Promise.all([
        createProjectComponents(projectId, components, companyId, transaction),
        createOrUpdateProjectPermission(
          { userIds: [userId], projectId, permission: ProjectPermission.Owner },
          transaction
        ),
      ]);
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
