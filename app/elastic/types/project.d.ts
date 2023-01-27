export interface CreateProjectDocumentInput {
  userId: string;
  projectId: string;
  category: string;
  deliveryAddress: string;
  country: string;
  deliveryDate: string;
  targetPrice: string;
  orderQuantities: number[];
  products: string[];
}

export interface UpdateProjectDocumentWithProjectSpecInput {
  projectId: string;
  category: string;
  deliveryAddress: string;
  country: string;
  deliveryDate: string;
  targetPrice: string;
  orderQuantities: number[];
}

export interface UpdateProjectDocumentProductsInput {
  projectId: string;
  products: string[];
}
