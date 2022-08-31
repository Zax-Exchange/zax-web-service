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
    name,
    designId,
    deliveryDate,
    deliveryAddress,
    budget,
    components,
  } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      const user = await users.findOne({
        where: {
          id: userId,
        },
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const project = await projects.create(
        {
          id: uuidv4(),
          userId,
          name,
          deliveryDate,
          deliveryAddress,
          budget,
          companyId,
          status: ProjectStatus.Open,
        },
        { transaction }
      );
      const projectId = project.getDataValue("id");

      // designId exists if user uploaded a project design
      if (designId) {
        const design = await sequelize.models.project_designs.findByPk(
          designId
        );

        await design?.update(
          {
            projectId,
          },
          { transaction }
        );
      }
      const products = [];
      for (let comp of components) {
        products.push(comp.componentSpec.productName);
      }
      await createProjectComponents(
        projectId,
        components,
        companyId,
        transaction
      );
      await createOrUpdateProjectPermission(
        { userIds: [userId], projectId, permission: ProjectPermission.Owner },
        transaction
      );
      ElasticProjectService.createProjectDocument({
        userId,
        projectId,
        deliveryDate,
        deliveryAddress,
        budget,
        products,
      });
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
