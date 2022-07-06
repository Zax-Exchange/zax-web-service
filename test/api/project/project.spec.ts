import { initModels, projects, users } from '../../../app/api/models/init-models';
import sequelize from "../../../app/api/utils/dbconnection";
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
import { getCustomerProjects, getVendorProjects } from "../../../app/api/project/getProjectApis";
import { CreateProjectComponentInput } from '../../../app/types/create/projectTypes';
import * as enums from "../../../app/types/common/enums";
import ProjectApiUtils from "../../../app/api/project/utils";

process.env.NODE_ENV = "test";

// need to wait for script to run to seed db
jest.setTimeout(10000);

describe("project tests", () => {
  beforeAll((done) => {
    initModels(sequelize);
    exec("npm run jest-setup-project-testing", () => {
      done();
    });
  });

  afterAll((done) => {
    sequelize.models.companies.destroy({ truncate: true ,cascade: true });
    series([
      () => exec("npm run unseedAll")
    ]);
    done()
  });

  it("should not allow vendor user to create project", async() => {
    const res = await sequelize.models.users.findAll().then(u => u.map(t => t.get()));
    const user = await sequelize.models.users.findOne({ where:{email: VENDOR_EMAILS[0]} });
    
    await expect(createProject({
      "budget": 10000,
      "components": []  as CreateProjectComponentInput[],
      "deliveryDate": "2022-12-31",
      "deliveryLocation": "USA",
      "name": "test project",
      "design": null,
      "userId": user!.get("id") as number
    })).rejects.toBeInstanceOf(Error);
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
      "deliveryLocation": "USA",
      "name": TEST_PROJECT_NAMES[0],
      "design": null,
      "userId": user!.get("id") as number
    })).resolves.toEqual(true);

    const projects = await getCustomerProjects(user?.get("id") as number);

    expect(projects.length).toEqual(1);
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
      "budget": 10000,
      "components": [
        { 
          id: components[0].id,
          "name": "component 1",
          "dimension": "10x10x15",
          "materials": ["paper", "plastic"],
          "postProcess": "glossy finish"
        }, 
      ],
      "deliveryDate": "2022-12-31",
      "deliveryLocation": "USA",
      "name": TEST_PROJECT_NAMES[0],
      "design": null,
      id: projectId
    })).resolves.toEqual(true); 
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
          "componentBidQuantityPrices": [
            {
              "projectComponentId": componentIds[0],
              "quantityPrices": [
                {
                  "price": 10000,
                  "quantity": 5000
                }
              ]
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

  it("should not allow project update if status is IN_PROGRESS", async() => {
    const user = await sequelize.models.users.findOne({ where:{email: CUSTOMER_EMAILS[0]} });
    const projectId = await (user as users).getProjects({
      "where": {
        name: TEST_PROJECT_NAMES[0]
      }
    }).then(ps => ps[0].get("id") as number);

    // actions in transactions don't throw error so cannot expect rejects
    await updateProject({
      "budget": 10000,
      "components": [],
      "deliveryDate": "2022-12-31",
      "deliveryLocation": "USA",
      "name": TEST_PROJECT_NAMES[1],
      "design": null,
      id: projectId
    }); 

    const project = await (user as users).getProjects({
      "where": {
        name: TEST_PROJECT_NAMES[0]
      }
    }).then(ps => ps[0].get());

    // check project still has previous name to make sure update isn't allowed
    expect(project.name).toEqual(TEST_PROJECT_NAMES[0]);
  });
})