import * as enums from "./enums";
import { QuantityPrice } from "../common/projectTypes";

export interface QuantityPrice {
  quantity: number;
  price: number;
}

// project for public view
export interface ProjectOverview {
  id: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryCountry: string;
  deliveryCity: string;
  budget: number;
  materials: string[];
  createdAt: Date;
}

export interface Project extends ProjectOverview{
  userId: number;
  design: BinaryType | null;
  status: enums.ProjectStatus;
  components: ProjectComponent[];
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

export interface SearchProjectInput {
  userInput: string; // should contain material names
  deliveryCountries?: string[];
  deliveryCities?: string[];
  budget?: number; // <= 10000, <= 30000, <= 50000, <= 100000
  leadTime?: number; // 3, 6, 9, 12
}