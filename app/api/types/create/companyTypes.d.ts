import * as planTypes from "../common/planTypes";

// vendor will have leadTime, locations, moq, materials
export interface CreateCompanyInput {
  name: string;
  logo?: string;
  phone: string;
  fax?: string;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime?: number;
  locations?: string[];
  moq?: number;
  materials?: string[];
  companyUrl?: string;
  planId: number;
}