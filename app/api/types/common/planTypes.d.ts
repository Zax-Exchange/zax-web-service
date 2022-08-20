import { CompanySize } from "./enums";

export interface CompanyPlan {
  id: string;
  planId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyPlanDetail {
  tier: string;
  price: number;
  billingFrequency: string;
  memberSince: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  trialStartDate?: string | null;
  trialEndDate?: string | null;
}

export interface PricingDetail {
  price: number;
  priceId: string
}
export interface Pricings {
  monthly?: PricingDetail;
  annual?: PricingDetail;
  perUser: PricingDetail;
}
export interface Plan {
  id: string;
  isVendor: boolean;
  companySize?: CompanySize;
  tier: string; 
  pricings: Pricings;
}