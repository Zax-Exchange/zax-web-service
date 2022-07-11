import * as planTypes from "./planTypes";
import * as enums from "./enums";

// company for public view, for search
export interface CompanyOverview {
  id: number;
  name: string;
  logo?: string;
  country: string;
  isVendor: boolean;
  isVerified: boolean;
  locations?: string[];
  materials?: string[];
}

// company detail
export interface Company extends CompanyOverview {
  fax?: string;
  phone: string;
  companyUrl?: string;
  isActive: boolean;
  moq?: number;
  leadTime?: number;
  createdAt: Date;
  updatedAt: Date;
}



export interface PermissionedCompany extends Company {
  isAdmin: boolean
  planInfo: planTypes.CompanyPlan;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
}


export interface SearchVendorInput {
  userInput: string;
  locations?: string[];
  moq?: number;
  leadTime?: number;
}