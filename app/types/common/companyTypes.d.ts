import * as planTypes from "./planTypes";

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


