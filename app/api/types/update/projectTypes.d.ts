import { DeleteProjectBidPermissionsInput, DeleteProjectPermissionsInput } from "../delete/projectTypes";

export interface UpdateProjectInput {
  id: string;
  projectData: UpdateProjectInputData;
  componentsInput: UpdateProjectComponentsInput;
}

export interface UpdateProjectInputData {
  name: string;
  deliveryDate: string;
  deliveryCountry: string;
  deliveryCity: string;
  budget: number;
  design: BinaryType | null;
}

export interface UpdateProjectComponentsInput {
  toFindOrCreate: UpdateProjectComponentInputData[];
  toDelete: number[];
}

export interface UpdateProjectComponentInputData {
  id: string | undefined; //if user is creating a new component, id should be undefined
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

export interface UpdateProjectBidInput {
  id: string;
  comments: string | "";
  components: UpdateProjectBidComponentInput[];
}

export interface UpdateProjectBidComponentInput {
  id: string;
  quantityPrices: QuantityPrice[];
}

export interface UpdateProjectBidPermissionsInput {
  viewers: UpdateProjectBidPermissionsInputData;
  editors: UpdateProjectBidPermissionsInputData;
}

export interface UpdateProjectBidPermissionsInputData {
  userIds: string[];
  projectId: string;
  projectBidId: string;
  permission: enums.ProjectPermission;
}

export interface UpdateProjectPermissionsInput {
  viewers: UpdateProjectPermissionsInputData;
  editors: UpdateProjectPermissionsInputData;
}

export interface UpdateProjectPermissionsInputData {
  userIds: string[];
  projectId: string;
  permission: enums.ProjectPermission;
}
