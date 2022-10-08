import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import { projects, projectsAttributes } from "../../../../models/projects";
import { project_changelogs } from "../../../../models/project_changelogs";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { updateProjectDocumentWithProjectSpecInput } from "../../../../elastic/types/project";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  UpdateProjectBidComponentInput,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";

const getProjectDiffs = (originalEntity: projects, projectUpdateData: UpdateProjectInput ) => {
  const output: project_changelogs[] = [];
  const changeId = uuidv4();
  Object.entries(projectUpdateData)
    .filter(([k,v]) => k !== 'projectId') // projectId is not changeable but is in UpdateProjectInput
    .forEach(([key, value]) =>  {
      const originalValue = originalEntity.getDataValue(key as keyof projectsAttributes);
      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectId: originalEntity.id,
          id: changeId,
          propertyName: key,
          oldValue: originalValue,
          newValue: value
        } as project_changelogs);
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
      if (originalModel === null) {
        return Promise.reject(new UserInputError(`could not find project with id ${projectId}`))
      }

      const changes: project_changelogs[] = getProjectDiffs( originalModel, data);
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
      changes.forEach((change: project_changelogs) => {
        updates.push(sequelize.models.project_changelog.create(
          {...change},
          { transaction }
        ));
      })
      await Promise.all(updates);
    });
    ElasticProjectService.updateProjectDocumentWithProjectSpec(
      data as updateProjectDocumentWithProjectSpecInput
    );
    //TODO: we should also update component spec name in Elastic
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
