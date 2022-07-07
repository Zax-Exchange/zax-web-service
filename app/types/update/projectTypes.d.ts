export interface UpdateProjectInput {
  id: number;
  projectData: UpdateProjectInputData;
  componentsInput: UpdateProjectComponentsInput;
}

export interface UpdateProjectInputData {
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: number;
  design: BinaryType | null;
}

export interface UpdateProjectComponentsInput {
  toFindOrCreate: UpdateProjectComponentInputData[];
  toDelete: number[];
}

export interface UpdateProjectComponentInputData {
  id: number | undefined; //if user is creating a new component, id should be undefined
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

export interface UpdateProjectBidInput {
  id: number;
  comments: string | "";
  components: UpdateProjectBidComponentInput[];
}

export interface UpdateProjectBidComponentInput {
  id: number;
  quantityPrices: QuantityPrice[];
}

export interface UpdateProjectBidPermissionsInput {
  userIds: number[];
  projectBidId: number;
  permission: enums.ProjectPermission;
}

export interface UpdateProjectPermissionsInput {
  userIds: number[];
  projectId: number;
  permission: enums.ProjectPermission;
}
