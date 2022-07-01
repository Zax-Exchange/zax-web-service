export interface User {
    id: number;
    name: string;
    email: string;
    companyId: number;
    userType: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  }
export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    companyId: number;
}

export interface UpdateUserInput {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UpdateUserPower {
  id: number;
  isAdmin: boolean;
}