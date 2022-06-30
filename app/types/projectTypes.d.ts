import * as enums from "./enums";

export interface Project {
  id: number;
  userId: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: string;
  design: BinaryType | null;
  status: enums.ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}


export interface PermissionedProject {
  id: number;
  userId: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: string;
  design: BinaryType | null;
  status: enums.ProjectStatus;
  permission: enums.ProjectPermission;
  createdAt: Date;
  updatedAt: Date;
}



export interface CreateProjectInput {
  userId: number;
  name: string;
  deliveryDate: string; 
  deliveryLocation: string;
  budget: number;
  design: BinaryType | null;
  components: CreateProjectComponentInput[]
}

export interface CreateProjectComponentInput {
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

export interface CreateProjectBidInput {
  userId: number;
  projectId: number;
  comments: string | "";
  components: CreateProjectComponentBidInput[];
}

export interface QuantityPrice {
  quantity: number;
  price: number;
}

export interface ComponentBidQuantityPriceInput {
  projectComponentId: number;
  quantityPrices: QuantityPrice[];
}
export interface CreateProjectComponentBidInput {
  componentBidQuantityPrices: ComponentBidQuantityPriceInput[];
}

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
  id: number;
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

export interface CreateOrUpdateProjectPermissionInput {
  userId: number;
  projectId: number;
  permission: enums.ProjectPermission;
}

export interface CreateOrUpdateProjectBidPermissionInput {
  userId: number;
  projectBidId: number;
  permission: enums.ProjectPermission;
}


export interface getProjectWithProjectIdInput {
  projectId: number;
  userId: number;
}

export interface DeleteProjectInput {
  projectId: number;
  userId: number;
}