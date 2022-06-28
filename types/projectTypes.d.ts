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
  comments: string;
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
}

export interface UpdateProjectComponentInput {
  id: number;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}