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

export interface updateProjectDocumentWithProjectSpecInput {
  projectId: string;
  category: string;
  deliveryAddress: string;
  deliveryDate: string;
  targetPrice: number;
  orderQuantities: number[];
}

export interface updateProjectDocumentProductsInput {
  projectId: string;
  products: string[];
}
