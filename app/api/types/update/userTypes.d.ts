export interface UpdateUserInput {
  id: string;
  data: UpdateUserInputData;
}

export interface UpdateUserPasswordInput {
  id: string;
  currentPassword: string;
  newPassword: string;
}
export interface UpdateUserInputData {
  name: string;
}

export interface UpdateUserPowerInput {
  id: string; 
  isAdmin: boolean;
}