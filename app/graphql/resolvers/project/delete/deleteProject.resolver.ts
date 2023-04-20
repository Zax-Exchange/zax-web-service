import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeleteProjectInput } from "../../../resolvers-types.generated";
import { deleteProjectDesign } from "./deleteProjectDesign.resolver";

const deleteProject = async (
  parent: any,
  { data }: { data: DeleteProjectInput },
  context: any,
  info: any
) => {
  const projects = sequelize.models.projects;
  const { projectId } = data;
  try {
    const allDesigns = await sequelize.models.project_designs
      .findAll({
        where: {
          projectId,
        },
      })
      .then((files) => files.map((file) => file.get("id") as string));

    await Promise.all(
      allDesigns.map((fileId) => {
        return deleteProjectDesign(null, {
          data: {
            fileId,
          },
        });
      })
    );

    await projects.destroy({
      where: {
        id: projectId,
      },
    });

    ElasticProjectService.deleteProjectDocument(projectId);
    await cacheService.invalidateProjectInCache(projectId);
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
