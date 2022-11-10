import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import cacheService from "../../../../redis/CacheService";
import { component_specs } from "../../../../models/component_specs";

// Direct create of project component, being called from edit project page
// If change this, please also update createComponents in createProject.resolver.ts
const createProjectComponents = async (
  parent: any,
  { data }: { data: CreateProjectComponentInput[] },
  context: any,
  info: any
) => {
  const project_components = sequelize.models.project_components;
  const component_specs = sequelize.models.component_specs;
  const designs = sequelize.models.project_designs;
  try {
    let projectId: string = "";
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map(async (component) => {
          const projectComponentId = uuidv4();
          projectId = component.projectId!;
          const { designIds } = component;

          return await Promise.all([
            project_components.create(
              {
                id: projectComponentId,
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
            designIds?.map(async (id) => {
              const design = await designs.findByPk(id);
              design?.update(
                {
                  projectId: component.projectId,
                  projectComponentId,
                },
                { transaction }
              );
            }),
          ]);
        })
      );
    });
    await cacheService.invalidateProjectInCache(projectId);

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const processComponentSpec = (
  componentSpec: CreateProjectComponentSpecInput
): Partial<component_specs> => {
  const res = {} as any;
  for (let attr in componentSpec) {
    const key = attr as keyof CreateProjectComponentSpecInput;
    if (typeof componentSpec[key] === "object") {
      res[key] = JSON.stringify(componentSpec[key]);
    } else {
      res[key] = componentSpec[key];
    }
  }
  return res;
};
export default {
  Mutation: {
    createProjectComponents,
  },
};
