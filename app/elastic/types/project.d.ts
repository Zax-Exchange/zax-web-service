export interface CreateProjectDocumentInput {
  userId: string;
  projectId: string;
  deliveryAddress: string;
  deliveryDate: string;
  budget: number;
  materials: string[];
}

export interface UpdateProjectDocumentInput {
  projectId: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  budget?: number;
  materials?: string[];
}