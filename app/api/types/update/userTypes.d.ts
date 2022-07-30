export interface UpdateUserInput {
  id: string;
  data: UpdateUserInputData
}

export interface UpdateUserInputData {
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface UpdateUserPowerInput {
  // user that's updating
  fromId: string; 
  // user being updated
  targetId: string; 
  isAdmin: boolean;
}