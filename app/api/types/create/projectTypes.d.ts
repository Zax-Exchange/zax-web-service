import * as enums from "../common/enums";
import { QuantityPrice } from "../common/projectTypes";

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
  components: CreateProjectBidComponentInput[];
}

export interface CreateProjectBidComponentInput {
  projectComponentId: number;
  quantityPrices: QuantityPriceInput[];
}

export interface QuantityPriceInput {
  price: number;
  quantity: number;
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