export interface User {
    id: number;
    name: string;
    email: string;
    companyId: number;
    isVendor: boolean;
    isAdmin: boolean;
  }

export interface LoggedInUser extends User {
  token: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  companyId: number;
}