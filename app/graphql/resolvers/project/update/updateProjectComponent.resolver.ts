import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import { project_components, project_componentsAttributes } from "../../../../models/project_components";
import { component_specs, component_specsAttributes } from "../../../../models/component_specs";
import { project_component_changelogs } from "../../../../models/project_component_changelogs";
import sequelize from "../../../../postgres/dbconnection";
import {
  UpdateProjectComponentInput,
} from "../../../resolvers-types.generated";
import streamService from "../../../../stream/StreamService";

const getProjectDiffs = (originalComponent: project_components, originalSpec: component_specs, componentUpdateData: UpdateProjectComponentInput ) => {
  const output: project_component_changelogs[] = [];
  const changeId = uuidv4();
  Object.entries(componentUpdateData)
    .filter(([k,v]) => k !== 'componentId'     // componentId is not changeable
                    && k !== "componentSpec")  // we want to track componentSpec as a group of changes rather than 1 change
    .forEach(([key, value]) =>  {
      const originalValue = originalComponent.getDataValue(key as keyof project_componentsAttributes);
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectComponentId: originalComponent.id,
          projectComponentSpecId: null,
          id: changeId,
          propertyName: key,
          oldValue: originalValue,
          newValue: value
        } as project_component_changelogs);
      }
    }
  );
  Object.entries(componentUpdateData.componentSpec)
    .forEach(([key, value]) =>  {
      const originalValue = originalSpec.getDataValue(key as keyof component_specsAttributes);
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectComponentId: originalComponent.id,
          projectComponentSpecId: originalSpec.id,
          id: changeId,
          propertyName: key,
          oldValue: originalValue,
          newValue: value
        } as project_component_changelogs);
      }
    }
  );
  return output;
}

const updateProjectComponent = async (
  parent: any,
  { data }: { data: UpdateProjectComponentInput },
  context: any,
  info: any
) => {
  const {
    componentId,
    componentSpec: componentSpecChanges,
    name
  } = data;

  try {
    let projectId: string | null = null;
    await sequelize.transaction(async (transaction) => {
      const projectComponent: project_components = await sequelize.models.project_components.findByPk(componentId) as project_components;
      projectId = projectComponent.projectId;
      if (projectComponent === null) {
        return Promise.reject(new UserInputError(`could not find project_component with id ${componentId}`))
      }
      const componentSpec = await projectComponent.getComponent_spec();
      if (componentSpec === null) {
        return Promise.reject(new UserInputError(`project component with id ${componentId} does not have a componentSpec`));
      }
      const componentSpecId = componentSpec.id
      const changes: project_component_changelogs[] = getProjectDiffs(projectComponent, componentSpec, data);
      const updates: Promise<any>[] = [
        sequelize.models.project_components.update(
          {
            name
          },
          {
            where: {
              id: componentId,
            },
            transaction,
          }
        ),
        sequelize.models.component_specs.update(
          componentSpecChanges,
          {
            where: {
              id: componentSpecId
            },
            transaction,
          }
        )
      ]
      changes.forEach((change: project_component_changelogs) => {
        updates.push(sequelize.models.project_component_changelogs.create(
          {
            projectComponentId: change.projectComponentId,
            projectComponentSpecId: change.projectComponentSpecId,
            id: change.id,
            propertyName: change.propertyName,
            oldValue: change.oldValue,
            newValue: change.newValue
          },
          { transaction }
        ));
      })
      await Promise.all(updates);
    });
    if (projectId != null) {
      streamService.broadcastProjectUpdate(projectId);
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProjectComponent,
  },
};
