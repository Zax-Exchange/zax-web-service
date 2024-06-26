import { Model, ModelStatic, Op, Transaction } from "sequelize";
import sequelize from "../postgres/dbconnection";
import { project_bids } from "../db/models/project_bids";
import { users } from "../db/models/users";
import { project_bid_permissionsAttributes } from "../db/models/project_bid_permissions";
import { project_permissionsAttributes } from "../db/models/project_permissions";
import { projects, projectsAttributes } from "../db/models/projects";
import {
  CustomerProject,
  CustomerProjectOverview,
  PermissionedProject,
  PermissionedProjectBid,
  Project,
  ProjectBid,
  ProjectBidComponent,
  ProjectComponent,
  ProjectComponentSpec,
  ProjectDesign,
  ProjectOverview,
  ProjectPermission,
  ProjectStatus,
  UserProjectPermission,
  VendorProject,
  VendorProjectOverview,
} from "../graphql/resolvers-types.generated";
import { project_changelogs } from "../db/models/project_changelogs";
import { project_component_changelogs } from "../db/models/project_component_changelogs";
import cacheService from "../redis/CacheService";
import {
  component_specs,
  component_specsAttributes,
} from "../db/models/component_specs";

class ProjectApiUtils {
  // Returns a list of vendor user ids that have bids for the project
  static async getBiddingVendorUserIdsForProject(projectId: string) {
    return await sequelize.models.project_bid_permissions
      .findAll({
        where: {
          projectId,
        },
      })
      .then((perms) => perms.map((perm) => perm.get("userId") as string));
  }

  static async getBidPermissions(
    userId: string
  ): Promise<project_bid_permissionsAttributes[]> {
    return await sequelize.models.users.findByPk(userId).then(async (user) => {
      return await (user as users)
        .getProject_bid_permissions()
        .then((permissions) => permissions.map((p) => p.get({ plain: true })));
    });
  }

  static async getProjectPermissions(
    userId: string
  ): Promise<project_permissionsAttributes[]> {
    return await sequelize.models.users.findByPk(userId).then(async (user) => {
      return await (user as users)
        .getProject_permissions()
        .then((permissions) => permissions.map((p) => p.get({ plain: true })));
    });
  }

  /**
   * Get project bid components with projectBidId
   * @param projectBidId
   * @returns
   */
  static async getBidComponents(
    projectBidId: string
  ): Promise<ProjectBidComponent[]> {
    const project_bid_components = sequelize.models.project_bid_components;

    try {
      const components = await project_bid_components
        .findAll({
          where: {
            projectBidId,
          },
        })
        .then((comps) => comps.map((comp) => comp.get({ plain: true })));
      return Promise.resolve(components);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Returns project attributes as stored in db
   * @param projectId
   */
  static async getProjectInstance(
    projectId: string
  ): Promise<projectsAttributes | null> {
    try {
      const cachedValue: projectsAttributes | null =
        await cacheService.getProjectInCache(projectId);
      if (cachedValue !== null) {
        return cachedValue;
      }
      return await sequelize.models.projects.findByPk(projectId).then((p) => {
        // If somehow db action fails, we return null
        if (!p) return null;

        const res = p.get({ plain: true }) as projectsAttributes;

        // Set in cache async
        cacheService.setProjectInCache(res);
        return res;
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Converts JSON stringified strings back to object for fields like dimension, postProcess, etc.
   * All other fields are preserved as is.
   * @param componentSpec
   * @returns ProjectComponentSpec
   */
  static convertComponentSpec(
    componentSpec: component_specsAttributes
  ): ProjectComponentSpec {
    const res = {} as any;
    for (let attr in componentSpec) {
      const key = attr as keyof component_specsAttributes;
      try {
        const parsed = JSON.parse(componentSpec[key] as any);
        if (typeof parsed === "object") {
          res[key] = parsed;
        } else {
          res[key] = componentSpec[key];
        }
      } catch (error) {
        res[key] = componentSpec[key];
      }
    }

    return res;
  }

  /**
   * Returns a generic project information with nested fields (project components/component specs)
   * @param id
   * @returns Project
   */
  static async getProject(id: string): Promise<Project | null> {
    // check if value is in cache, and if so, return it
    const cachedValue: Project | null =
      await cacheService.getDetailedProjectInCache(id);
    if (cachedValue !== null) {
      return Promise.resolve(cachedValue);
    }

    try {
      return await sequelize.models.projects.findByPk(id).then(async (p) => {
        // If somehow db action fails, we return null
        if (!p) return null;

        return Promise.all([
          (p as projects).getProject_components(),
          (p as projects).getCompany(),
        ]).then(async (res) => {
          const [componentInstances, companyInstance] = res;

          // sort from new to old
          const sortedComps = componentInstances.sort((a, b) => {
            return a.createdAt < b.createdAt
              ? 1
              : a.createdAt > b.createdAt
              ? -1
              : 0;
          });
          const components = await Promise.all(
            sortedComps.map(async (comp) => {
              const componentSpec = await comp.getComponent_spec();
              const designs = await comp.getProject_designs();

              return {
                ...comp.get({ plain: true }),
                componentSpec: {
                  ...this.convertComponentSpec(
                    componentSpec.get({ plain: true })
                  ),
                },
                designs: designs.map((design) => ({
                  fileId: design.id,
                  filename: design.fileName,
                  url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_COMPONENT_DESIGNS_FOLDER}/${design.id}`,
                })),
              } as ProjectComponent;
            })
          );

          const retValue: Project = {
            ...p?.get({ plain: true }),
            companyName: companyInstance.name,
            components,
          };

          // store the value into cache async
          Promise.all([
            cacheService.setProjectInCache(
              p.get({ plain: true }) as projectsAttributes
            ),
            cacheService.setDetailedProjectInCache(retValue),
          ]);
          return retValue;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getProjectBidsByProjectId(
    projectId: string
  ): Promise<ProjectBid[]> {
    const project_bids = sequelize.models.project_bids;
    try {
      return await project_bids
        .findAll({
          where: {
            projectId,
          },
        })
        .then(async (bids) => {
          const res = [];
          for (let bid of bids) {
            const [components, remarkFile] = await Promise.all([
              (bid as project_bids).getProject_bid_components(),
              (bid as project_bids).getBid_remark(),
            ]);
            res.push({
              ...bid?.get({ plain: true }),
              components: components.map((comp) => comp.get({ plain: true })),
              remarkFile: remarkFile
                ? {
                    fileId: remarkFile.id,
                    filename: remarkFile.fileName,
                    url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_BID_REMARKS_FOLDER}/${remarkFile.id}`,
                  }
                : null,
            });
          }
          return res;
        });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // for vendor & customer
  static async getPermissionedProject(
    projectId: string,
    userPermission?: ProjectPermission
  ) {
    try {
      const project = await ProjectApiUtils.getProject(projectId);

      if (!project) return null;

      // vendor permission will always be viewer, customer permission will vary
      const res = {
        ...project,
        permission: userPermission ? userPermission : ProjectPermission.Viewer,
      } as PermissionedProject;
      return Promise.resolve(res);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // for vendor, gets a single projectBid with projectBidId
  static async getPermissionedProjectBid(
    projectBidId: string,
    permission: ProjectPermission
  ): Promise<PermissionedProjectBid> {
    try {
      const rawUserBid = (await sequelize.models.project_bids.findByPk(
        projectBidId
      )) as project_bids;
      const [componentsInstances, remarkFileInstance] = await Promise.all([
        rawUserBid.getProject_bid_components(),
        rawUserBid.getBid_remark(),
      ]);

      const components = componentsInstances.map((instance) =>
        instance.get({ plain: true })
      );
      const remarkFile = remarkFileInstance?.get({ plain: true });

      const userBid = rawUserBid?.get({ plain: true });

      return {
        ...userBid,
        components,
        remarkFile: remarkFile
          ? {
              fileId: remarkFile.id,
              filename: remarkFile.fileName,
              url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_BID_REMARKS_FOLDER}/${remarkFile.id}`,
            }
          : null,
        permission,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateProjectStatus(
    projectId: string,
    status: ProjectStatus,
    transaction?: Transaction
  ): Promise<boolean> {
    const projects = sequelize.models.projects;
    try {
      await projects.update(
        {
          status,
        },
        {
          where: {
            id: projectId,
          },
          transaction,
        }
      );
      return Promise.resolve(true);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  /**
   * Gets all the users (excludes company-wide permissions) that have access to the project
   * @param projectId
   * @returns Promise<UserProjectPermission[]>
   */
  static async getProjectUsers(projectId: string) {
    try {
      const projectUsers: Partial<UserProjectPermission>[] =
        await sequelize.models.project_permissions
          .findAll({
            where: {
              projectId,
              companyId: null,
            },
          })
          .then((ps) =>
            ps.map((p) => {
              return {
                userId: p.get("userId") as string,
                permission: p.get("permission") as ProjectPermission,
              };
            })
          );

      return await Promise.all(
        projectUsers.map(async (data) => {
          const user = await sequelize.models.users
            .findByPk(data.userId)
            .then((u) => u?.get({ plain: true }));
          return {
            ...data,
            email: user.email,
            name: user.name,
          } as UserProjectPermission;
        })
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getProjectBidUsers(projectBidId: string) {
    try {
      const projectUsers = await sequelize.models.project_bid_permissions
        .findAll({
          where: {
            projectBidId,
          },
        })
        .then((ps) =>
          ps.map((p) => {
            return {
              userId: p.get("userId") as string,
              permission: p.get("permission") as ProjectPermission,
            };
          })
        );
      const res = [];
      for (let data of projectUsers) {
        const user = await sequelize.models.users
          .findByPk(data.userId)
          .then((u) => u?.get({ plain: true }));

        res.push({
          ...data,
          email: user.email,
          name: user.name,
        } as UserProjectPermission);
      }

      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default ProjectApiUtils;
