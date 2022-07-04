import * as enums from "./enums";
import { QuantityPrice } from "../common/projectTypes";

export interface QuantityPrice {
  quantity: number;
  price: number;
}

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
  components: ProjectComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorProject extends PermissionedProject {

  bidInfo: PermissionedProjectBid | null;
}

export interface CustomerProject extends PermissionedProject {
  bids: PermissionedProjectBid[] | null;
}

export interface ProjectComponent {
  id: number;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
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
  components: ProjectComponent[];
  permission: enums.ProjectPermission;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBid {
  id: number;
  userId: number;
  projectId: number;
  components: ProjectComponentsBid[];
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectComponentsBid {
  id: number;
  projectComponentId: number;
  quantityPrices: QuantityPrice[];
}

export interface PermissionedProjectBid {
  id: number;
  userId: number;
  projectId: number;
  components: ProjectComponentBid[];
  permission: enums.ProjectPermission;
  createdAt: Date;
  updatedAt: Date;
}
