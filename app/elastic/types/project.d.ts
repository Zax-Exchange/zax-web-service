export interface ProjectDocument {
  projectId: number;
  deliveryLocation: string;
  deliveryDate: string;
  budget: number;
  materials: string[];
}

export interface ProjectOverview {
  id: number;
  companyId: number;
  name: string;
  deliveryDate: string;
  deliveryLocation: string;
  budget: number;
  materials: string[];
  createdAt: Date;
}