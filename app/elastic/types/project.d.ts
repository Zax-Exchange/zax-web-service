export interface CreateProjectDocumentInput {
  userId: string;
  projectId: string;
  category: string;
  deliveryAddress: string;
  deliveryDate: string;
  targetPrice: string;
  orderQuantities: number[];
  products: string[];
}

export interface updateProjectDocumentWithProjectSpecInput {
  projectId: string;
  category: string;
  deliveryAddress: string;
  deliveryDate: string;
  targetPrice: string;
  orderQuantities: number[];
}

export interface updateProjectDocumentProductsInput {
  projectId: string;
  products: string[];
}
