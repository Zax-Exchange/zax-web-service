import * as enums from "./enums";
import { QuantityPrice } from "../common/projectTypes";

export interface QuantityPrice {
  quantity: number;
  price: number;
}

export interface ProjectOverview {
  id: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: number;
  materials: string[];
  createdAt: Date;
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

export interface PermissionedProject extends Project {
  permission: enums.ProjectPermission;
}

export interface VendorProject extends PermissionedProject {
  bidInfo: PermissionedProjectBid | null;
}

export interface CustomerProject extends PermissionedProject {
  bids: PermissionedProjectBid[] | [];
}

export interface ProjectComponent {
  id: number;
  projectId: number;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBid {
  id: number;
  userId: number;
  projectId: number;
  components: ProjectBidComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBidComponent {
  id: number;
  projectComponentId: number;
  quantityPrices: QuantityPrice[];
}

export interface PermissionedProjectBid extends ProjectBid{
  permission: enums.ProjectPermission;

}
