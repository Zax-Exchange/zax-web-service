import { Model, ModelStatic, Op, Transaction } from "sequelize";
import sequelize from "../../postgres/dbconnection";
import { project_bids } from "../models/project_bids";
import { users } from "../models/users";
import { project_bid_permissionsAttributes } from "../models/project_bid_permissions";
import { project_permissionsAttributes } from "../models/project_permissions";
import { projects, projectsAttributes } from "../models/projects";
import { getUserWithUserId } from "../user/getUserApis";
import {
  CustomerProject,
  PermissionedProjectBid,
  Project,
  ProjectBid,
  ProjectBidComponent,
  ProjectComponent,
  ProjectDesign,
  ProjectOverview,
  ProjectPermission,
  ProjectStatus,
  UserPermission,
  VendorProject,
} from "../../graphql/resolvers-types.generated";

class ProjectApiUtils {
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
   * Get project components with projectId
   * @param projectId
   * @returns commonProjectTypes.ProjectComponent
   */
  static async getProjectComponents(
    projectId: string
  ): Promise<ProjectComponent[]> {
    const project_components = sequelize.models.project_components;
    try {
      const components = await project_components
        .findAll({
          where: {
            projectId,
          },
        })
        .then((comps) => comps.map((comp) => comp.get({ plain: true })));
      return Promise.resolve(components);
    } catch (e) {
      return Promise.reject(e);
    }
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
   * Returns a generic project information
   * @param id
   * @returns Project
   */
  static async getProject(id: string): Promise<Project> {
    const projects = sequelize.models.projects;

    try {
      return await projects.findByPk(id).then(async (p) => {
        const components = await (p as projects)
          ?.getProject_components()
          .then((comps) => comps.map((comp) => comp.get({ plain: true })));
        const designObject = await (p as projects)?.getProject_design();

        let design = null;

        if (designObject) {
          design = {
            fileName: designObject.get("fileName"),
            url: `${process.env.AWS_CDN_URL}/${designObject.get("id")}`,
          } as ProjectDesign;
        }

        return {
          ...p?.get({ plain: true }),
          design,
          components,
        };
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
      const bids = await project_bids
        .findAll({
          where: {
            projectId,
          },
        })
        .then(async (bids) => {
          const res = [];
          for (let bid of bids) {
            const components = await (bid as project_bids)
              .getProject_bid_components()
              .then((comps) => comps.map((comp) => comp.get({ plain: true })));
            res.push({
              ...bid?.get({ plain: true }),
              components,
            });
          }
          return res;
        });
      return bids;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  // for customer, get all bids with projectId
  static async getPermissionedProjectBids(
    projectId: string
  ): Promise<PermissionedProjectBid[]> {
    const project_bids = sequelize.models.project_bids;
    try {
      const bids = await project_bids
        .findAll({
          where: {
            projectId,
          },
        })
        .then((bids) => bids.map((b) => b.get({ plain: true })));
      const res = [];
      for (let bid of bids) {
        res.push({
          ...bid,
          permission: ProjectPermission.Viewer,
        });
      }
      return res;
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

      // const components = await ProjectApiUtils.getProjectComponents(projectId);

      // vendor permission will always be viewer, customer permission will vary
      const res = {
        ...project,
        permission: userPermission ? userPermission : "VIEWER",
      } as VendorProject | CustomerProject;
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
      const rawUserBid = await sequelize.models.project_bids.findByPk(
        projectBidId
      );
      const components = (await (rawUserBid as project_bids)
        .getProject_bid_components()
        .then((comps) =>
          comps.map((comp) => comp.get({ plain: true }))
        )) as ProjectBidComponent[];

      const userBid = rawUserBid?.get({ plain: true });

      return {
        ...userBid,
        components,
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

  static async getProjectUsers(projectId: string) {
    try {
      const projectUsers = await sequelize.models.project_permissions
        .findAll({
          where: {
            projectId,
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
        const user = await getUserWithUserId(data.userId);

        res.push({
          ...data,
          email: user.email,
          name: user.name,
        } as UserPermission);
      }

      return res;
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
        const user = await getUserWithUserId(data.userId);

        res.push({
          ...data,
          email: user.email,
          name: user.name,
        } as UserPermission);
      }

      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default ProjectApiUtils;
