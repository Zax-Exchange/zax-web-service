import { initModels, projects, users } from '../../../app/api/models/init-models';
import sequelize from "../../../app/postgres/dbconnection";
import { exec } from 'child_process';
import {series} from 'async';
import {
  VENDOR_EMAILS,
  CUSTOMER_EMAILS,
  TEST_PROJECT_NAMES,
  TEST_PROJECT_BID_NAMES
} from "../../constants";
import { createProject, createProjectBid } from "../../../app/api/project/createProjectApis";
import { 
  updateProject, 
  updateProjectBidPermissions, 
  updateProjectComponents,
  updateProjectPermissions,
} from "../../../app/api/project/updateProjectApis";
import { getCustomerProjects, getVendorProjects, getProjectDetail } from "../../../app/api/project/getProjectApis";
import { CreateProjectComponentInput } from '../../../app/types/create/projectTypes';
import * as enums from "../../../app/api/types/common/enums";
import ProjectApiUtils from "../../../app/api/utils/projectUtils";

process.env.NODE_ENV = "test";

// need to wait for script to run to seed db
jest.setTimeout(100000);

describe("project tests", () => {
  beforeAll((done) => {
    initModels(sequelize);
    exec("npm run jest-setup-project-testing", () => {
      done();
    })
  });

  afterAll((done) => {
    sequelize.models.companies.destroy({ truncate: true ,cascade: true });
    sequelize.models.materials.destroy({ truncate: true ,cascade: true });
    exec("npm run unseed-users", () => {
      done();
    });
  });

  it("should allow customer user to create project and corresponding components", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[0]} });
    await expect(createProject({
      "budget": 10000,
      "components": [
        { 
          "name": "component 1",
          "dimension": "10x10x15",
          "materials": ["paper", "plastic"],
          "postProcess": "glossy finish"
        },  
      ],
      "deliveryDate": "2022-12-31",
      "deliveryCountry": "USA",
      "deliveryCity": "Los Angeles",
      "name": TEST_PROJECT_NAMES[0],
      "design": null,
      "userId": user!.get("id") as number
    })).resolves.toEqual(true);

    const projects = await getCustomerProjects(user?.get("id") as number);

    expect(projects.length).toEqual(1);
  });

  it("should get project detail", async () => {
    const project = await sequelize.models.projects.findOne({ where: {name: TEST_PROJECT_NAMES[0]} }).then(p => p?.get({plain:true}));
    const userProject = await getProjectDetail(project.id);
    expect(userProject).toBeTruthy();

    expect(userProject).toHaveProperty("budget", 10000);
    expect(userProject).toHaveProperty("deliveryDate", "2022-12-31");
    expect(userProject).toHaveProperty("deliveryCountry", "USA");
    expect(userProject).toHaveProperty("name", TEST_PROJECT_NAMES[0]);
    expect(userProject).toHaveProperty("userId");
    expect(userProject).toHaveProperty("design", null);
    expect(userProject.components).toHaveLength(1);
    expect(userProject.components[0].materials).toEqual(["paper", "plastic"]);
  });

  it("should not allow non project-related customers to see project", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[1]} });

    await expect(getCustomerProjects(user!.get("id") as number)).resolves.toHaveLength(0);
  });

  it("should allow project-related customers to see project", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[0]} });

    const res = await getCustomerProjects(user!.get("id") as number);
    expect(res).toHaveLength(1);
    expect(res[0]).toHaveProperty(["permission"], enums.ProjectPermission.OWNER);
  });

  // TODO: should test with multiple userIds
  it("should allow project permission update", async() => {
    const user1 = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[0]} });
    const user2 = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[1]} });
    const projectId = await sequelize.models.projects.findOne({ where:{name: TEST_PROJECT_NAMES[0]}}).then(p => p?.get("id") as number);
    await expect(updateProjectPermissions({
      "permission": enums.ProjectPermission.VIEWER,
      projectId,
      userIds: [user2?.get("id") as number]
    })).resolves.toEqual(true);
  });

  it("should allow permission-granted customer to see project", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[1]} });

    const res = await getCustomerProjects(user!.get("id") as number);
    expect(res).toHaveLength(1);
    expect(res[0]).toHaveProperty(["permission"], enums.ProjectPermission.VIEWER);
  });

  it("should allow project update from OWNER", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[0]} });
    const projectId = await (user as users).getProjects({
      "where": {
        name: TEST_PROJECT_NAMES[0]
      }
    }).then(ps => ps[0].get("id") as number);

    const components = await ProjectApiUtils.getProjectComponents(projectId);

    await expect(updateProject({
      "projectData": {
        "budget": 10000,
        "deliveryDate": "2022-12-31",
         "deliveryCountry": "USA",
        "deliveryCity": "Seattle",
        "name": TEST_PROJECT_NAMES[0],
        "design": null,
      },
      id: projectId,
      "componentsInput": {
        "toFindOrCreate":[
          { 
            id: components[0].id,
            "name": "component 1",
            "dimension": "10x10x15",
            "materials": ["paper", "plastic"],
            "postProcess": "glossy finish"
          }
        ],
        "toDelete": []
      }
    })).resolves.toEqual(true); 

    await expect(sequelize.models.materials.findAll()).resolves.toHaveLength(2);
  });


  it("should allow vendor to bid for project", async () => {
    const userId = await sequelize.models.users.findOne({ where:{email: VENDOR_EMAILS[0]} }).then(u => u?.get("id") as number);
    const project = await sequelize.models.projects.findOne({ where:{name: TEST_PROJECT_NAMES[0]}});
    const componentIds = await (project as projects).getProject_components().then(comps => comps.map(c => c.get("id")));

    await expect(createProjectBid({
      userId,
      "comments": "",
      "components": [
        {
          "projectComponentId": componentIds[0],
          "quantityPrices": [
            {
              "price": 10000,
              "quantity": 5000
            }
          ]
        }
      ],
      projectId: project?.get("id") as number
    })).resolves.toEqual(true);
  });

  it("should update project status after bid has been made", async () => {
    const project = await sequelize.models.projects.findOne({ where:{name: TEST_PROJECT_NAMES[0]}});
    expect(project?.get("status")).toEqual(enums.ProjectStatus.IN_PROGRESS);
  });

  it("should allow project-related customers to see project bid", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[1]} });

    const res = await getCustomerProjects(user!.get("id") as number);
    expect(res[0].bids).toHaveLength(1);
    expect(res[0].permission).toEqual(enums.ProjectPermission.VIEWER)
  });
})