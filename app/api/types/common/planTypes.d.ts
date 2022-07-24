export interface CompanyPlan {
  id: number;
  planId: number;
  companyId: number;
  remainingQuota: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  licensedUsers: number;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}