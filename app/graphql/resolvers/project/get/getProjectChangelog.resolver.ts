import { project_changelogs } from "../../../../db/models/project_changelogs";
import { project_component_changelogs } from "../../../../db/models/project_component_changelogs";
import sequelize from "../../../../postgres/dbconnection";
import {
  GetProjectChangelogInput,
  GetProjectComponentChangelogInput,
  ProjectChangelog,
  ProjectComponentChangelog,
  ProjectComponentPropertyChange,
  ProjectPropertyChange,
} from "../../../resolvers-types.generated";

const getProjectChangelogHelper = async (projectId: string) => {
  try {
    const projectChangelogs: project_changelogs[] =
      (await sequelize.models.project_changelog.findAll({
        where: {
          projectId,
        },
        order: [["createdAt", "DESC"]],
      })) as project_changelogs[];
    const groupedChanges: ProjectChangelog[] = [];
    let lastChangeId = null;
    for (let changelog of projectChangelogs) {
      if (changelog.id !== lastChangeId) {
        groupedChanges.push({
          projectId,
          changedAt: changelog.createdAt,
          changes: [],
        } as ProjectChangelog);
        lastChangeId = changelog.id;
      }
      const changes = groupedChanges.at(-1)!.changes;
      changes.push(changelog as ProjectPropertyChange);
    }
    return groupedChanges;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectChangelog = async (
  parent: any,
  { data }: { data: GetProjectChangelogInput },
  context: any
) => {
  const { projectId } = data;
  try {
    return await getProjectChangelogHelper(projectId);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectChangelog,
  },
};
