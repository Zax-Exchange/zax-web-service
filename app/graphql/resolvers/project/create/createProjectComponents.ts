import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { CreateProjectComponentInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a list of project components associated with projectId
 * @param projectId
 * @param components
 * @param transaction
 * @returns boolean
 */
const createProjectComponents = async (
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
              ...component.componentSpec,
              dimension: component.componentSpec.dimension
                ? JSON.stringify(component.componentSpec.dimension)
                : null,
            },
            { transaction }
          ),
        ]);
      })
    );

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default createProjectComponents;
