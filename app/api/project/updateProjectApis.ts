import sequelize from "../../postgres/dbconnection";
import * as projectTypes from "../types/update/projectTypes";
import * as enums from "../types/common/enums";
import { Transaction } from "sequelize/types";
import {
  createOrUpdateProjectPermission,
  createOrUpdateProjectBidPermission,
} from "./createProjectApis";
import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import { deleteProjectPermissions } from "./deleteProjectApis";
import { v4 as uuidv4 } from "uuid";
import {
  UpdateProjectBidPermissionsInput,
  UpdateProjectPermissionsInput,
} from "../../graphql/resolvers-types.generated";

// TODO: finish implementation
const updateProject = async (
  data: projectTypes.UpdateProjectInput
): Promise<boolean> => {
  const { id, projectData, componentsInput } = data;
  const { toFindOrCreate, toDelete } = componentsInput;
  const { deliveryDate, deliveryAddress, budget } = projectData;
  const projects = sequelize.models.projects;
  const materials = [];
  for (let comp of toFindOrCreate) {
    for (let mat of comp.materials) {
      materials.push(mat);
    }
  }

  try {
    ElasticProjectService.updateProjectDocument({
      projectId: id,
      deliveryDate,
      deliveryAddress,
      budget,
      materials,
    });
    await sequelize.transaction(async (transaction) => {
      await projects.update(projectData, {
        where: {
          id,
        },
        transaction,
      });
      await updateProjectComponents(toFindOrCreate, transaction);
    });

    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// this goes with update project
const updateProjectComponents = async (
  components: projectTypes.UpdateProjectComponentInputData[],
  transaction?: Transaction
): Promise<boolean> => {
  const project_components = sequelize.models.project_components;
  try {
    for (let component of components) {
      const { id, name, materials, dimension, postProcess } = component;

      await project_components
        .findOrCreate({
          where: { id: id },
          defaults: {
            id: uuidv4(),
            name,
            materials,
            dimension,
            postProcess,
          },
          transaction,
        })
        .then(async ([comp, created]) => {
          if (!created) {
            await comp.update(
              {
                name,
                materials,
                dimension,
                postProcess,
              },
              { transaction }
            );
          }
        });
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// TODO: finish implementation
const updateProjectBid = async (
  data: projectTypes.UpdateProjectBidInput
): Promise<boolean> => {
  const { id, comments, components } = data;
  const project_bids = sequelize.models.project_bids;

  try {
    await sequelize.transaction(async (transaction) => {
      await project_bids.update(
        {
          comments,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );
      await updateProjectBidComponents(components, transaction);
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// this goes with update project bid
const updateProjectBidComponents = async (
  components: projectTypes.UpdateProjectBidComponentInput[],
  transaction?: Transaction
): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;

  try {
    for (let component of components) {
      const { id, quantityPrices } = component;
      await project_bid_components.update(
        {
          quantityPrices,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// bulk create or update project permissions
const updateProjectPermissions = async (
  data: UpdateProjectPermissionsInput
): Promise<boolean> => {
  const { viewers, editors } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      Promise.all([
        await createOrUpdateProjectPermission(
          {
            userIds: viewers.userIds,
            projectId: viewers.projectId,
            permission: viewers.permission,
          },
          transaction
        ),
        await createOrUpdateProjectPermission(
          {
            userIds: editors.userIds,
            projectId: editors.projectId,
            permission: editors.permission,
          },
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

const updateProjectBidPermissions = async (
  data: UpdateProjectBidPermissionsInput
): Promise<boolean> => {
  const { viewers, editors } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      Promise.all([
        await createOrUpdateProjectBidPermission(
          {
            userIds: viewers.userIds,
            projectId: viewers.projectId,
            projectBidId: viewers.projectBidId,
            permission: viewers.permission,
          },
          transaction
        ),
        await createOrUpdateProjectBidPermission(
          {
            userIds: editors.userIds,
            projectId: editors.projectId,
            projectBidId: editors.projectBidId,
            permission: editors.permission,
          },
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

export {
  updateProject,
  updateProjectComponents,
  updateProjectBid,
  updateProjectBidComponents,
  updateProjectPermissions,
  updateProjectBidPermissions,
};
