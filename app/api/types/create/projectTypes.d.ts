import * as enums from "../common/enums";
import { QuantityPrice } from "../common/projectTypes";

export interface CreateProjectInput {
  userId: string;
  name: string;
  deliveryDate: string; 
  deliveryAddress: string;
  designId: string;
  budget: number;
  comments: string;
  components: CreateProjectComponentInput[];
}

export interface CreateProjectComponentInput {
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

export interface CreateProjectBidInput {
  userId: string;
  projectId: string;
  comments: string;
  components: CreateProjectBidComponentInput[];
}

export interface CreateProjectBidComponentInput {
  projectComponentId: string;
  quantityPrices: QuantityPriceInput[];
}

export interface QuantityPriceInput {
  price: number;
  quantity: number;
}

export interface CreateOrUpdateProjectPermissionInput {
  userId: string;
  projectId: string;
  permission: enums.ProjectPermission;
}

export interface CreateOrUpdateProjectBidPermissionInput {
  userId: string;
  projectId: string;
  projectBidId: string;
  permission: enums.ProjectPermission;
}