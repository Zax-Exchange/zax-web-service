import { projects, projectsAttributes } from "../../../../models/projects";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";

const determineProjectDiff = (originalEntity: projects, projectUpdateData: UpdateProjectInput ) => {
  console.debug('originalmodel=', originalEntity);
  console.debug('updatedata=', projectUpdateData);
  var output: any[] = [];
  Object.entries(projectUpdateData)
    .filter(([k,v]) => k !== 'projectId') // projectId is not changeable but is in UpdateProjectInput
    .forEach(([key, value]) =>  {
      const originalValue = originalEntity.getDataValue(key as keyof projectsAttributes);
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          key,
          old: originalValue,
          new: value
        });
      }
    }
  );
  return output;
}

// TODO: broadcast update project even to vendors
const updateProject = async (
  parent: any,
  { data }: { data: UpdateProjectInput },
  context: any,
  info: any
) => {
  const {
    projectId,
    name,
    category,
    totalWeight,
    deliveryAddress,
    deliveryDate,
    targetPrice,
    orderQuantities,
  } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      const originalModel: projects = await sequelize.models.projects.findByPk(projectId) as projects;
      const changes = determineProjectDiff( originalModel, data);
      console.log('changes=', changes);
      await Promise.all([
        sequelize.models.projects.update(
          {
            name,
            category,
            totalWeight,
            deliveryAddress,
            deliveryDate,
            targetPrice,
            orderQuantities,
          },
          {
            where: {
              id: projectId,
            },
            transaction,
          }
        ),
        sequelize.models.project_bids.update(
          {
            status: BidStatus.Outdated,
          },
          {
            where: {
              projectId,
            },
            transaction,
          }
        ),
      ]);
    });
    streamService.broadcastProjectUpdate(data.projectId);
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProject,
  },
};
