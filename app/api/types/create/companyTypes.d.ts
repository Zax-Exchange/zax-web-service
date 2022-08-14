import * as planTypes from "../common/planTypes";

// vendor will have leadTime, locations, moq, materials
export interface CreateCompanyInput {
  name: string;
  contactEmail: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  planId: string;
  userEmail: string;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}

export interface CreateVendorInput extends CreateCompanyInput {
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface CreateCustomerInput extends CreateCompanyInput {

}