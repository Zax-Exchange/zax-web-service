import sequelize from "../../../../postgres/dbconnection";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProjectPermission,
  ProjectStatus,
  ProjectVisibility,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import createOrUpdateProjectPermission from "./createOrUpdateProjectPermission";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { Transaction } from "sequelize/types";
import cacheService from "../../../../redis/CacheService";
import { component_specs } from "../../../../db/models/component_specs";
import CompanyApiUtils from "../../../../utils/companyUtils";
import ErrorUtils from "../../../../utils/ErrorUtils";

// if change this, please also update the same method in updateProjectComponents.ts
const processComponentSpec = (
  componentSpec: CreateProjectComponentSpecInput
): Partial<component_specs> => {
  const res = {} as any;
  for (let attr in componentSpec) {
    const key = attr as keyof CreateProjectComponentSpecInput;
    if (typeof componentSpec[key] === "object" && componentSpec[key] !== null) {
      res[key] = JSON.stringify(componentSpec[key]);
    } else {
      res[key] = componentSpec[key];
    }
  }
  return res;
};

/**
 * Creates a list of project components associated with projectId
 * @param components
 * @param transaction
 * @returns boolean
 */
export const createProjectComponents = async (
  projectId: string,
  components: CreateProjectComponentInput[],
  transaction: Transaction
) => {
  const project_components = sequelize.models.project_components;
  const component_specs = sequelize.models.component_specs;
  const designs = sequelize.models.project_designs;
  try {
    await Promise.all(
      components.map(async (component) => {
        const projectComponentId = uuidv4();
        const { designIds } = component;

        await Promise.all([
          project_components.create(
            {
              id: projectComponentId,
              projectId,
              ...component,
            },
            { transaction }
          ),
          component_specs.create(
            {
              id: uuidv4(),
              projectComponentId,
              ...processComponentSpec(component.componentSpec),
            },
            { transaction }
          ),
        ]);

        if (designIds) {
          await Promise.all(
            designIds.map(async (id) => {
              const design = await designs.findByPk(id);
              design?.update(
                {
                  projectId,
                  projectComponentId,
                },
                { transaction }
              );
            })
          );
        }
      })
    );
    await cacheService.invalidateProjectInCache(projectId);
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

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
    country,
    components,
    visibility,
  } = data;
  try {
    const user = await users.findByPk(userId);
    const companyId = await user!.getDataValue("companyId");
    const isFreePlan = await CompanyApiUtils.isFreePlan(companyId);

    if (isFreePlan) {
      const allProjects = await projects.findAndCountAll({
        where: {
          companyId,
        },
      });
      if (allProjects.count >= 2) {
        throw ErrorUtils.restrictedForFreePlanError();
      }
    }

    const projectId = uuidv4();
    const products: string[] = [];

    await sequelize.transaction(async (transaction) => {
      await projects.create(
        {
          id: projectId,
          userId,
          creationMode,
          name,
          deliveryDate,
          deliveryAddress,
          country,
          category,
          totalWeight,
          targetPrice,
          orderQuantities,
          companyId,
          status: ProjectStatus.Open,
          visibility,
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

    if (visibility === ProjectVisibility.Public) {
      ElasticProjectService.createProjectDocument({
        userId,
        projectId,
        category,
        deliveryDate,
        deliveryAddress,
        country,
        targetPrice,
        orderQuantities,
        products,
      });
    }

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
