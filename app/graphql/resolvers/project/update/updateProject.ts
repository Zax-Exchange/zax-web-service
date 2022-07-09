import { updateProject as updateProjectApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectInput } from "../../../../types/update/projectTypes";

const updateProject = (parent: any, args: Record<string, UpdateProjectInput>, context: any, info: any) => {
  const data = {
    "id": 90,
    projectData: {
      "name": "test",
      "deliveryDate": "2022-12-31",
      "deliveryLocation": "USA",
      "budget": 500000,
      "design": null,
    },
    componentsInput: {
      toFindOrCreate: [
      {
        "id": 105,
        "name": "test",
        "materials": ["test mat"],
        "dimension": "1x1x1",
        "postProcess": "N/A"
      }
    ],
    toDelete: []
    }
  } as UpdateProjectInput
  return updateProjectApi(data);
};

export default updateProject;