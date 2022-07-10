import * as planTypes from "./planTypes";
import * as enums from "./enums";

export interface Company {
  id: number;
  name: string;
  logo: string;
  phone: string;
  fax: string;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: number;
  companyUrl: string;
  planInfo: planTypes.CompanyPlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionedCompany extends Company {
  isAdmin: boolean
}

export interface GeneralCompany {
  id: number;
  name: string;
  logo: string;
  phone: string;
  fax: string;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: number;
  companyUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

