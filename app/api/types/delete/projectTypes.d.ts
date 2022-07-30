export interface DeleteProjectInput {
  projectId: string;
  userId: string;
}

export interface DeleteProjectComponentsInput {
  projectComponentIds: string[];
  projectId: string;
  userId: string
}

export interface DeleteProjectBidInput {
  projectBidId: string;
  userId: string;
}

export interface DeleteProjectBidComponentsInput {
  projectBidComponentIds: string[];
  projectBidId: string;
  userId: string;
}

export interface DeleteProjectPermissionsInput {
  userIds: string[];
  projectId: string;
}

export interface DeleteProjectBidPermissionsInput {
  userIds: string[];
  projectBidId: string;
}