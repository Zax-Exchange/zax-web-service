import * as planTypes from "./planTypes";
import * as enums from "./enums";


export interface Company {
  id: string;
  name: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVerified: boolean;
  isVendor: boolean;
  planId: string;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}

export interface Vendor extends Company{
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface Customer extends Company {
  
}


// company for public view, for search
export interface CompanyOverview {
  id: string;
  name: string;
  logo?: string;
  country: string;
  isVerified: boolean;
}

export interface VendorOverview extends CompanyOverview {
  leadTime: number;
  locations: string[];
  materials: string[];
  moq: string;
}

export interface CustomerOverview extends CompanyOverview {

}

export interface PermissionedCompany extends Vendor, Customer {
  isAdmin: boolean
  planInfo: planTypes.CompanyPlan;
}

// for general users view (both external & internal)
export interface CompanyDetail {
  id: string;
  name: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVerified: boolean;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}

export interface VendorDetail extends CompanyDetail {
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface CustomerDetail extends CompanyDetail {

}

export interface SearchVendorInput {
  userInput: string;
  locations?: string[];
  moq?: number;
  leadTime?: number;
}