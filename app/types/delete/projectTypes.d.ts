export interface DeleteProjectInput {
  projectId: number;
  userId: number;
}

export interface DeleteProjectComponentsInput {
  projectComponentIds: number[];
  projectId: number;
  userId: number
}

export interface DeleteProjectBidInput {
  projectBidId: number;
  userId: number;
}

export interface DeleteProjectComponentsBidInput {
  projectComponentBidIds: number[];
  projectBidId: number;
  userId: number;
}

export interface DeleteProjectPermissionsInput {
  userIds: number[];
  projectId: number;
}

export interface DeleteProjectBidPermissionsInput {
  userIds: number[];
  projectBidId: number;
}