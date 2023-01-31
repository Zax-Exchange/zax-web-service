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

import streamService from "../../../../stream/StreamService";
import cacheService from "../../../../redis/CacheService";
import { Model, Transaction } from "sequelize/types";
import {
  PostProcessDetailInput,
  UpdateProjectComponentData,
  UpdateProjectComponentSpecData,
} from "../../../resolvers-types.generated";
import { deleteProjectDesign } from "../delete/deleteProjectDesign.resolver";
import { project_designs } from "../../../../models/project_designs";

// if change this, please also update the same method in createProject.resolver.ts
const processComponentSpecChanges = (spec: UpdateProjectComponentSpecData) => {
  const res = {} as any;
  for (let attr in spec) {
    const key = attr as keyof UpdateProjectComponentSpecData;
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
  componentUpdateData: UpdateProjectComponentData,
  originalDesigns: project_designs[],
  newDesigns: project_designs[]
) => {
  const output: project_component_changelogs[] = [];
  const changeId = uuidv4();

  if (componentUpdateData.name !== originalComponent.get("name")) {
    output.push({
      projectComponentId: originalComponent.id,
      projectComponentSpecId: null,
      id: changeId,
      propertyName: "name",
      oldValue: originalComponent.get("name"),
      newValue: componentUpdateData.name,
    } as project_component_changelogs);
  }

  if (JSON.stringify(originalDesigns) !== JSON.stringify(newDesigns)) {
    output.push({
      projectComponentId: originalComponent.id,
      projectComponentSpecId: null,
      id: changeId,
      propertyName: "designs",
      oldValue: originalDesigns.map((d) => ({
        id: d.id,
        filename: d.fileName,
      })),
      newValue: newDesigns.map((d) => ({ id: d.id, filename: d.fileName })),
    } as project_component_changelogs);
  }

  Object.entries(componentUpdateData.componentSpec)
    .filter(([k, v]) => k !== "componentSpecId")
    .forEach(([key, value]) => {
      const attr = key as keyof component_specsAttributes;
      let originalValue = originalSpec.getDataValue(attr);

      // dimension and postProcess from db will be stringified already, so no need to stringify again when comparing with incoming data
      if (attr !== "dimension" && attr !== "postProcess") {
        originalValue = JSON.stringify(originalValue);
      }

      if (JSON.stringify(value) !== originalValue) {
        // perform a deep comparison
        output.push({
          projectComponentId: originalComponent.id,
          projectComponentSpecId: originalSpec.id,
          id: changeId,
          propertyName: key,
          oldValue: originalSpec.getDataValue(attr),
          newValue: value,
        } as project_component_changelogs);
      }
    });
  return output;
};

const updateProjectComponents = async (
  data: UpdateProjectComponentData[],
  transaction: Transaction
) => {
  try {
    let projectId: string | null = null;

    await Promise.all(
      data.map(async (input) => {
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

        const componentDesignsIds = (await sequelize.models.project_designs
          .findAll({
            where: {
              projectComponentId: componentId,
            },
          })
          .then((designs) => designs.map((d) => d.get("id")))) as string[];

        projectId = projectComponent.projectId;

        if (projectComponent === null) {
          return Promise.reject(
            new UserInputError(
              `could not find project_component with id ${componentId}`
            )
          );
        }

        const [existingDesigns, componentSpec, ...newDesigns] =
          await Promise.all([
            projectComponent.getProject_designs(),
            projectComponent.getComponent_spec(),
            ...designIds.map((id) =>
              sequelize.models.project_designs
                .findByPk(id)
                .then((d) => d?.get({ plain: true }) as project_designs)
            ),
          ]);

        if (componentSpec === null) {
          return Promise.reject(
            new UserInputError(
              `project component with id ${componentId} does not have a componentSpec`
            )
          );
        }

        const updateDesignsPromises: Promise<any>[] = [];
        const deleteDesignsPromises: Promise<any>[] = [];

        existingDesigns.forEach((design) => {
          if (!designIds.length || !designIds.includes(design.id)) {
            deleteDesignsPromises.push(
              deleteProjectDesign(null, { data: { fileId: design.id } })
            );
          }
        });

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

        const componentSpecId = componentSpec.id;

        const changes: project_component_changelogs[] = getProjectDiffs(
          projectComponent,
          componentSpec,
          input,
          existingDesigns,
          newDesigns
        );

        return Promise.all([
          ...updateDesignsPromises,
          ...deleteDesignsPromises,
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
      })
    );

    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default updateProjectComponents;
