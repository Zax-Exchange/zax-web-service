export interface UpdateUserInput {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UpdateUserPowerInput {
  // user that's updating
  fromId: number; 
  // user being updated
  targetId: number; 
  isAdmin: boolean;
}