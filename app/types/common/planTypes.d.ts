export interface CompanyPlan {
  planInfo: Plan;
  remainingQuota: number;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  licensedUsers: number;
  createdAt: Date;
  updatedAt: Date;
}