import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";
import UserApiUtils from "../../utils/userUtils";
import CompanyApiUtils from "../../utils/companyUtils";
import sequelize from "../../postgres/dbconnection";
import { projectsAttributes } from "../../models/projects";
import ProjectApiUtils from "../../utils/projectUtils";
import { Project } from "../../graphql/resolvers-types.generated";


const PROJECT_INDEX_NAME = "project";
export default class ElasticProjectService {
  static async createProjectIndex() {
    return elasticClient.indices.create({
      index: PROJECT_INDEX_NAME,
      mappings: {
        properties: {
          id: { type: "text" },
          companyName: { type: "text" },
          category: { type: "search_as_you_type" },
          deliveryDate: { type: "date" },
          deliveryAddress: { type: "text" },
          country: { type: "text" },
          targetPrice: { type: "float" },
          orderQuantities: { type: "integer" },
          products: { type: "search_as_you_type" },
          deleted: { type: "boolean" },
        },
      }
    });
  }
  static async createProjectDocument(
    data: projectTypes.CreateProjectDocumentInput
  ) {
    const {
      userId,
      projectId,
      category,
      deliveryAddress,
      country,
      deliveryDate,
      targetPrice,
      orderQuantities,
      products,
    } = data;

    try {
      // await elasticClient.indices.delete({ index: "project" });
      const exist = await elasticClient.indices.exists({ index: "project" });

      const companyId = await UserApiUtils.getUserCompanyId(userId);
      const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);

      if (!exist) {
        await this.createProjectIndex();
      }
      await elasticClient.index({
        index: PROJECT_INDEX_NAME,
        id: projectId,
        document: {
          companyName: company.name,
          category,
          deliveryAddress,
          deliveryDate,
          country,
          targetPrice,
          orderQuantities,
          products,
          deleted: false,
        },
        refresh: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Updates project spec, without updating components (products)
  static async updateProjectDocumentWithProjectSpec(
    data: projectTypes.UpdateProjectDocumentWithProjectSpecInput
  ) {
    const { projectId, deliveryAddress, country, deliveryDate, targetPrice, orderQuantities, category } =
      data;
    await elasticClient
      .update({
        index: PROJECT_INDEX_NAME,
        id: projectId,
        doc: {
          category,
          deliveryAddress,
          country,
          deliveryDate,
          targetPrice,
          orderQuantities
        },
      })
      .catch((e) => {
        console.error(e)
      });
  }

  // Updates project document with updated products list
  static async updateProjectDocumentProducts(
    data: projectTypes.UpdateProjectDocumentProductsInput
  ) {
    const { products, projectId } = data;

    try {
      await elasticClient.update({
        index: PROJECT_INDEX_NAME,
        id: projectId,
        doc: {
          products,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteProjectDocument(id: string) {
    await elasticClient
      .update({
        index: PROJECT_INDEX_NAME,
        id,
        doc: {
          deleted: true,
        },
      })
      .catch((e) => console.error(e));
  }

  static async searchProjectDocuments(query: any) {
    return await elasticClient
      .search({
        index: PROJECT_INDEX_NAME,
        query: query,
        highlight: {
          fields: {
            products: {},
          },
        },
      })
      .then((res) => {
        return res.hits.hits;
      })
      .catch((e) => {
        console.error(e);
        return Promise.reject(e);
      });
  }

  static async syncProjectsWithES() {
    try {
      const exist = await elasticClient.indices.exists({ index: PROJECT_INDEX_NAME });
      if (!exist) {
        await this.createProjectIndex();
      } else {
        await elasticClient.deleteByQuery({
          index: PROJECT_INDEX_NAME,
          body: {
            query: {
              match_all: {}
            }
          }
        });
      }
  
      const syncJobs: Promise<any>[] = [];
      const res = await sequelize.models.projects.findAll();
      for (const item of res) {
        const projectAttributes = item.get({ plain: true }) as projectsAttributes;
        if (projectAttributes) {
          const project: Project = await ProjectApiUtils.getProject(projectAttributes.id) as Project;
          const products: string[] = project.components.map(component => component.componentSpec.productName);
          const company = await CompanyApiUtils.getCompanyWithCompanyId(project.companyId);
          syncJobs.push(elasticClient.index({
            index: PROJECT_INDEX_NAME,
            id: project.id,
            document: {
              companyName: company.name,
              category: project.category,
              deliveryAddress: project.deliveryAddress,
              deliveryDate: project.deliveryDate,
              country: project.country,
              targetPrice: project.targetPrice,
              orderQuantities: project.orderQuantities,
              products,
              deleted: false, // db doesn't keep deleted projects
            }
          }));
        }        
      }
      await Promise.all(syncJobs);      
    } catch (error) {
      console.log(error);
    }
  }
}
