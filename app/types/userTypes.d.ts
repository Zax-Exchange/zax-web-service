export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    companyId: number;
    isAdmin: boolean;
}

export interface UpdateUserInput {
  id: number;
  email: string;
  password: string;
  companyId: number;
  isAdmin: boolean;
}