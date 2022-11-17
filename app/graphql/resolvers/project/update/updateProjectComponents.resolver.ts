import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import {
  project_components,
  project_componentsAttributes,
} from "../../../../models/project_components";
import {
  component_specs,
  component_specsAttributes,
} from "../../../../models/component_specs";
import { project_component_changelogs } from "../../../../models/project_component_changelogs";
import sequelize from "../../../../postgres/dbconnection";
import {
  UpdateProjectComponentInput,
  UpdateProjectComponentSpecInput,
} from "../../../resolvers-types.generated";
import streamService from "../../../../stream/StreamService";
import cacheService from "../../../../redis/CacheService";
import { Model } from "sequelize/types";

const processComponentSpecChanges = (spec: UpdateProjectComponentSpecInput) => {
  const res = {} as any;
  for (let attr in spec) {
    const key = attr as keyof UpdateProjectComponentSpecInput;
    // handle null here since when client GETS a ProjectComponent, the gql query queries all the fields and many of them will be null
    if (typeof spec[key] === "object" && spec[key] !== null) {
      res[key] = JSON.stringify(spec[key]);
    } else {
      res[key] = spec[key];
    }
  }
  return res;
};

const getProjectDiffs = (
  originalComponent: project_components,
  originalSpec: component_specs,
  componentUpdateData: UpdateProjectComponentInput
) => {
  const output: project_component_changelogs[] = [];
  const changeId = uuidv4();
  Object.entries(componentUpdateData)
    .filter(
      ([k, v]) =>
        k !== "componentId" && // componentId is not changeable
        k !== "componentSpec"
    ) // we want to track componentSpec as a group of changes rather than 1 change
    .forEach(([key, value]) => {
      const originalValue = originalComponent.getDataValue(
        key as keyof project_componentsAttributes
      );
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectComponentId: originalComponent.id,
          projectComponentSpecId: null,
          id: changeId,
          propertyName: key,
          oldValue: originalValue,
          newValue: value,
        } as project_component_changelogs);
      }
    });
  Object.entries(componentUpdateData.componentSpec).forEach(([key, value]) => {
    const originalValue = originalSpec.getDataValue(
      key as keyof component_specsAttributes
    );
    // perform a deep comparison
    if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
      output.push({
        projectComponentId: originalComponent.id,
        projectComponentSpecId: originalSpec.id,
        id: changeId,
        propertyName: key,
        oldValue: originalValue,
        newValue: value,
      } as project_component_changelogs);
    }
  });
  return output;
};

const updateProjectComponents = async (
  parent: any,
  { data }: { data: UpdateProjectComponentInput[] },
  context: any,
  info: any
) => {
  try {
    let projectId: string | null = null;
    await sequelize.transaction(async (transaction) => {
      for (let input of data) {
        const {
          componentId,
          componentSpec: componentSpecChanges,
          name,
          designIds,
        } = input;

        const projectComponent: project_components =
          (await sequelize.models.project_components.findByPk(
            componentId
          )) as project_components;
        projectId = projectComponent.projectId;

        if (projectComponent === null) {
          return Promise.reject(
            new UserInputError(
              `could not find project_component with id ${componentId}`
            )
          );
        }
        const componentSpec = await projectComponent.getComponent_spec();
        if (componentSpec === null) {
          return Promise.reject(
            new UserInputError(
              `project component with id ${componentId} does not have a componentSpec`
            )
          );
        }
        const updateDesignsPromises: Promise<any>[] = [];
        if (designIds) {
          designIds.forEach((id) => {
            updateDesignsPromises.push(
              sequelize.models.project_designs.update(
                {
                  projectId,
                  projectComponentId: componentId,
                },
                {
                  where: {
                    id,
                  },
                  transaction,
                }
              )
            );
          });
        }
        const componentSpecId = componentSpec.id;

        const changes: project_component_changelogs[] = getProjectDiffs(
          projectComponent,
          componentSpec,
          input
        );

        await Promise.all([
          // ...updateDesignsPromises,
          ...changes.map((change) => {
            return sequelize.models.project_component_changelogs.create(
              { ...change },
              { transaction }
            );
          }),
          sequelize.models.project_components.update(
            {
              name,
            },
            {
              where: {
                id: componentId,
              },
              transaction,
            }
          ),
          sequelize.models.component_specs.update(
            {
              ...processComponentSpecChanges(componentSpecChanges),
            },
            {
              where: {
                id: componentSpecId,
              },
              transaction,
            }
          ),
        ]);
      }
    });
    if (projectId != null) {
      streamService.broadcastProjectUpdate(projectId);
      await cacheService.invalidateProjectInCache(projectId);
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProjectComponents,
  },
};
