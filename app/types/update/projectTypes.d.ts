export interface UpdateProjectInput {
  id: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: number;
  design: BinaryType | null;
  status: string;
  components: UpdateProjectComponentInput[];
}

export interface UpdateProjectComponentInput {
  id: number[];
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

export interface UpdateProjectBidInput {
  id: number;
  comments: string | "";
  components: UpdateProjectComponentBidInput[];
}

export interface UpdateProjectComponentBidInput {
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
