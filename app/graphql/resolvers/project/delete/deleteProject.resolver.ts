import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteProjectInput } from "../../../resolvers-types.generated";

const deleteProject = async (
  parent: any,
  { data }: { data: DeleteProjectInput },
  context: any,
  info: any
) => {
  const projects = sequelize.models.projects;
  const { projectId } = data;
  try {
    await projects.destroy({
      where: {
        id: projectId,
      },
    });
    ElasticProjectService.deleteProjectDocument(projectId);
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deleteProject,
  },
};
