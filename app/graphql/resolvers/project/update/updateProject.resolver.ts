import { v4 as uuidv4 } from "uuid";
import { projects, projectsAttributes } from "../../../../models/projects";
import { project_changelog } from "../../../../models/project_changelog";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";

const determineProjectDiffs = (originalEntity: projects, projectUpdateData: UpdateProjectInput ) => {
  console.debug('originalmodel=', originalEntity);
  console.debug('updatedata=', projectUpdateData);
  var output: project_changelog[] = [];
  const changeId = uuidv4();
  const changeTime = new Date();
  var index = 0;
  Object.entries(projectUpdateData)
    .filter(([k,v]) => k !== 'projectId') // projectId is not changeable but is in UpdateProjectInput
    .forEach(([key, value]) =>  {
      const originalValue = originalEntity.getDataValue(key as keyof projectsAttributes);
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectId: originalEntity.id,
          id: changeId,
          index,
          propertyName: key,
          oldValue: originalValue,
          newValue: value,
          changeTime
        } as project_changelog);
        index++;
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
      const changes: project_changelog[] = determineProjectDiffs( originalModel, data);
      console.log(changes)
      const updates: Promise<any>[] = [
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
        )
      ]
      changes.forEach((change: project_changelog) => {
        updates.push(sequelize.models.project_changelog.create(
          {
            projectId: change.projectId,
            id: change.id,
            index: change.index,
            propertyName: change.propertyName,
            oldValue: change.oldValue,
            newValue: change.newValue,
            changeTime: change.changeTime
          },
          // { transaction }
        ));
      })
      await Promise.all(updates);
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
