
export interface Project {
  id: number;
  userId: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: string;
  design: BinaryType | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  isActive: boolean;
  permission: ProjectPermission;
  createdAt: string;
  updatedAt: string;
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

export interface CreateProjectPermissionInput {
  userId: number;
  projectId: number;
  permission: ProjectPermission;
}

export interface CreateProjectBidPermissionInput {
  userId: number;
  projectBidId: number;
  permission: ProjectPermission;
}


export interface getProjectWithProjectIdInput {
  projectId: number;
  userId: number;
}