import { project_component_changelogs } from "../../../../models/project_component_changelogs";
import sequelize from "../../../../postgres/dbconnection";
import {
  GetProjectComponentChangelogInput,
  ProjectComponentChangelog,
  ProjectComponentPropertyChange,
} from "../../../resolvers-types.generated";

const getProjectComponentChangelogHelper = async (
  projectComponentId: string
) => {
  try {
    const projectChangelogs: project_component_changelogs[] =
      (await sequelize.models.project_component_changelogs.findAll({
        where: {
          projectComponentId,
        },
        order: [["createdAt", "DESC"]],
      })) as project_component_changelogs[];

    const groupedChanges: ProjectComponentChangelog[] = [];

    let lastChangeId = null;

    for (let changelog of projectChangelogs) {
      if (changelog.id !== lastChangeId) {
        groupedChanges.push({
          projectComponentId,
          changedAt: changelog.createdAt,
          changes: [],
        } as ProjectComponentChangelog);
        lastChangeId = changelog.id;
      }
      const changes = groupedChanges.at(-1)!.changes;
      changes.push(changelog as ProjectComponentPropertyChange);
    }

    return groupedChanges;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectComponentChangelog = async (
  parent: any,
  { data }: { data: GetProjectComponentChangelogInput },
  context: any
) => {
  const { projectComponentIds } = data;
  try {
    const data = await Promise.all(
      projectComponentIds.map((id) => getProjectComponentChangelogHelper(id))
    );

    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectComponentChangelog,
  },
};
