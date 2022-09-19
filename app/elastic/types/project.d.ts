export interface CreateProjectDocumentInput {
  userId: string;
  projectId: string;
  category: string;
  deliveryAddress: string;
  deliveryDate: string;
  targetPrice: number;
  orderQuantities: number[];
  products: string[];
}

export interface UpdateProjectDocumentInput {
  projectId: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  targetPrice?: number;
  orderQuantities?: number[];
  products?: string[];
}
