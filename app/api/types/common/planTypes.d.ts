export interface CompanyPlan {
  id: string;
  planId: string;
  companyId: string;
  remainingQuota: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  licensedUsers: number;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}