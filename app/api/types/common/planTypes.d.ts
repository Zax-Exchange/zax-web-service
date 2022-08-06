export interface CompanyPlan {
  id: string;
  planId: string;
  companyId: string;
  remainingQuota: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingDetail {
  price: number;
  priceId: string
}
export interface Pricings {
  monthly: PricingDetail;
  annual: PricingDetail;
  additionalLicense: PricingDetail;
}
export interface Plan {
  id: string;
  isVendor: boolean
  planTier?: string; 
  name: string;
  pricings: Pricings;
  licensedUsers: number;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}