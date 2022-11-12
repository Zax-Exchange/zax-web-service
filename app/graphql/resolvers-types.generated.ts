// THIS FILE IS GENERATED. DO NOT EDIT.
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  Upload: any;
};

export enum BidStatus {
  Accepted = 'ACCEPTED',
  Expired = 'EXPIRED',
  Open = 'OPEN',
  Outdated = 'OUTDATED',
  Rejected = 'REJECTED'
}

export type CancelStripeSubscriptionInput = {
  email: Scalars['String'];
};

export type CheckCompanyNameInput = {
  companyName: Scalars['String'];
};

export type CheckUserEmailInput = {
  email: Scalars['String'];
};

export type CompanyDetail = {
  __typename?: 'CompanyDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['Date'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  moq?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  products?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
};

export enum CompanyPermission {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CompanyPlan = {
  __typename?: 'CompanyPlan';
  companyId: Scalars['String'];
  id: Scalars['String'];
  planId: Scalars['String'];
};

export type CompanyPlanDetail = {
  __typename?: 'CompanyPlanDetail';
  billingFrequency: Scalars['String'];
  memberSince: Scalars['String'];
  price: Scalars['Int'];
  subscriptionEndDate: Scalars['String'];
  subscriptionStartDate: Scalars['String'];
  tier: PlanTier;
  trialEndDate?: Maybe<Scalars['String']>;
  trialStartDate?: Maybe<Scalars['String']>;
};

export enum CompanySize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xs = 'XS'
}

export type CreateCustomerInput = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
  userEmail: Scalars['String'];
};

export type CreateProjectBidComponentInput = {
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
  samplingFee: Scalars['Int'];
  toolingFee?: InputMaybe<Scalars['Int']>;
};

export type CreateProjectBidInput = {
  comments: Scalars['String'];
  components: Array<CreateProjectBidComponentInput>;
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProjectComponentInput = {
  componentSpec: CreateProjectComponentSpecInput;
  designIds?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  projectId?: InputMaybe<Scalars['String']>;
};

export type CreateProjectComponentSpecInput = {
  boxStyle?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  dimension: ProductDimensionInput;
  finish?: InputMaybe<Scalars['String']>;
  flute?: InputMaybe<Scalars['String']>;
  includeArtworkInQuote?: InputMaybe<Scalars['Boolean']>;
  insideColor?: InputMaybe<Scalars['String']>;
  insideFinish?: InputMaybe<Scalars['String']>;
  insideMaterial?: InputMaybe<Scalars['String']>;
  insideMaterialSource?: InputMaybe<Scalars['String']>;
  manufacturingProcess?: InputMaybe<Scalars['String']>;
  material?: InputMaybe<Scalars['String']>;
  materialSource?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['String']>;
  outsideColor?: InputMaybe<Scalars['String']>;
  outsideFinish?: InputMaybe<Scalars['String']>;
  outsideMaterial?: InputMaybe<Scalars['String']>;
  outsideMaterialSource?: InputMaybe<Scalars['String']>;
  postProcess?: InputMaybe<Array<PostProcessDetailInput>>;
  productName: Scalars['String'];
  purpose?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  thickness?: InputMaybe<Scalars['String']>;
};

export type CreateProjectInput = {
  category: Scalars['String'];
  comments: Scalars['String'];
  components: Array<CreateProjectComponentInput>;
  creationMode: ProjectCreationMode;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateStripeCustomerInput = {
  email: Scalars['String'];
};

export type CreateUserInput = {
  companyId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateVendorInput = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
  products: Array<Scalars['String']>;
  userEmail: Scalars['String'];
};

export type CreateVendorSubscriptionInput = {
  perUserPriceId: Scalars['String'];
  stripeCustomerId: Scalars['String'];
  subscriptionPriceId: Scalars['String'];
};

export type CustomerDetail = {
  __typename?: 'CustomerDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CustomerOverview = {
  __typename?: 'CustomerOverview';
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CustomerProject = ProjectInterface & {
  __typename?: 'CustomerProject';
  bids?: Maybe<Array<ProjectBid>>;
  category: Scalars['String'];
  comments: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  creationMode: ProjectCreationMode;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type CustomerProjectOverview = {
  __typename?: 'CustomerProjectOverview';
  category: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type DeactivateUserInput = {
  email: Scalars['String'];
};

export type DeleteProjectBidPermissionsInput = {
  projectBidId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteProjectDesignInput = {
  designId: Scalars['String'];
};

export type DeleteProjectInput = {
  projectId: Scalars['String'];
};

export type DeleteProjectPermissionsInput = {
  projectId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  uri: Scalars['String'];
};

export type FileUploadResponse = {
  __typename?: 'FileUploadResponse';
  Bucket: Scalars['String'];
  ETag: Scalars['String'];
  Key: Scalars['String'];
  Location: Scalars['String'];
  key: Scalars['String'];
};

export type GetAllPendingJoinRequestsInput = {
  companyId: Scalars['String'];
};

export type GetAllPlansInput = {
  isVendor: Scalars['Boolean'];
};

export type GetAllUsersWithinCompanyInput = {
  companyId: Scalars['String'];
};

export type GetCompanyDetailInput = {
  companyId: Scalars['String'];
};

export type GetCompanyPlanDetailInput = {
  companyId: Scalars['String'];
};

export type GetCustomerDetailInput = {
  companyId: Scalars['String'];
};

export type GetCustomerProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetCustomerProjectsInput = {
  userId: Scalars['String'];
};

export type GetPlanInput = {
  planId: Scalars['String'];
};

export type GetProjectBidInput = {
  companyId: Scalars['String'];
  projectId: Scalars['String'];
};

export type GetProjectBidUsersInput = {
  projectBidId: Scalars['String'];
};

export type GetProjectChangelogInput = {
  projectId: Scalars['String'];
};

export type GetProjectComponentChangelogInput = {
  projectComponentId: Scalars['String'];
};

export type GetProjectDetailInput = {
  projectId: Scalars['String'];
};

export type GetProjectUsersInput = {
  projectId: Scalars['String'];
};

export type GetUserInput = {
  userId: Scalars['String'];
};

export type GetVendorDetailInput = {
  companyId: Scalars['String'];
};

export type GetVendorProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetVendorProjectsInput = {
  userId: Scalars['String'];
};

export type InviteUserInput = {
  email: Scalars['String'];
  userId: Scalars['String'];
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  chatToken: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  notificationToken: Scalars['String'];
  power: UserPower;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelStripeSubscription: Scalars['Boolean'];
  createCustomer: Scalars['String'];
  createCustomerSubscription: StripeSubscription;
  createProject: Scalars['Boolean'];
  createProjectBid: Scalars['Boolean'];
  createProjectComponents: Scalars['Boolean'];
  createStripeCustomer: Scalars['String'];
  createUser: LoggedInUser;
  createVendor: Scalars['String'];
  createVendorSubscription: StripeSubscription;
  deactivateUser: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteProjectBidPermissions: Scalars['Boolean'];
  deleteProjectDesign: Scalars['Boolean'];
  deleteProjectPermissions: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  requestToJoin: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  updateCompanyPlan: Scalars['Boolean'];
  updateCompanyPlanSubscriptionInfo: Scalars['Boolean'];
  updateCompanyStatus: Scalars['Boolean'];
  updateCustomerInfo: Scalars['Boolean'];
  updateProject: Scalars['Boolean'];
  updateProjectBidPermissions: Scalars['Boolean'];
  updateProjectComponents: Scalars['Boolean'];
  updateProjectPermissions: Scalars['Boolean'];
  updateStripeSubscription: Scalars['Boolean'];
  updateUserInfo: Scalars['Boolean'];
  updateUserPassword: Scalars['Boolean'];
  updateUserPower: Scalars['Boolean'];
  updateVendorInfo: Scalars['Boolean'];
  uploadProjectDesign: ProjectDesign;
};


export type MutationCancelStripeSubscriptionArgs = {
  data: CancelStripeSubscriptionInput;
};


export type MutationCreateCustomerArgs = {
  data: CreateCustomerInput;
};


export type MutationCreateCustomerSubscriptionArgs = {
  priceId: Scalars['String'];
  stripeCustomerId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreateProjectBidArgs = {
  data: CreateProjectBidInput;
};


export type MutationCreateProjectComponentsArgs = {
  data: Array<CreateProjectComponentInput>;
};


export type MutationCreateStripeCustomerArgs = {
  data: CreateStripeCustomerInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVendorArgs = {
  data: CreateVendorInput;
};


export type MutationCreateVendorSubscriptionArgs = {
  data: CreateVendorSubscriptionInput;
};


export type MutationDeactivateUserArgs = {
  data: DeactivateUserInput;
};


export type MutationDeleteProjectArgs = {
  data: DeleteProjectInput;
};


export type MutationDeleteProjectBidPermissionsArgs = {
  data: DeleteProjectBidPermissionsInput;
};


export type MutationDeleteProjectDesignArgs = {
  data: DeleteProjectDesignInput;
};


export type MutationDeleteProjectPermissionsArgs = {
  data: DeleteProjectPermissionsInput;
};


export type MutationInviteUserArgs = {
  data: InviteUserInput;
};


export type MutationRequestToJoinArgs = {
  data: RequestToJoinInput;
};


export type MutationResetArgs = {
  t?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCompanyPlanArgs = {
  data: UpdateCompanyPlanInput;
};


export type MutationUpdateCompanyPlanSubscriptionInfoArgs = {
  data: UpdateCompanyPlanSubscriptionInfoInput;
};


export type MutationUpdateCompanyStatusArgs = {
  data: UpdateCompanyStatusInput;
};


export type MutationUpdateCustomerInfoArgs = {
  data: UpdateCustomerInfoInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateProjectBidPermissionsArgs = {
  data: UpdateProjectBidPermissionsInput;
};


export type MutationUpdateProjectComponentsArgs = {
  data: Array<UpdateProjectComponentInput>;
};


export type MutationUpdateProjectPermissionsArgs = {
  data: UpdateProjectPermissionsInput;
};


export type MutationUpdateStripeSubscriptionArgs = {
  data: UpdateStripeSubscriptionInput;
};


export type MutationUpdateUserInfoArgs = {
  data: UpdateUserInfoInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};


export type MutationUpdateUserPowerArgs = {
  data: UpdateUserPowerInput;
};


export type MutationUpdateVendorInfoArgs = {
  data: UpdateVendorInfoInput;
};


export type MutationUploadProjectDesignArgs = {
  file: Scalars['Upload'];
};

export type PermissionedCompany = {
  __typename?: 'PermissionedCompany';
  companyUrl: Scalars['String'];
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['Date'];
  fax: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo: Scalars['String'];
  moq?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planInfo: CompanyPlan;
  power: UserPower;
  products?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
};

export type PermissionedProjectBid = {
  __typename?: 'PermissionedProjectBid';
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  permission: ProjectPermission;
  projectId: Scalars['String'];
  status: BidStatus;
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  companySize?: Maybe<CompanySize>;
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  pricings: Pricings;
  tier: PlanTier;
};

export enum PlanTier {
  Business = 'BUSINESS',
  Premium = 'PREMIUM'
}

export type PostProcessDetail = {
  __typename?: 'PostProcessDetail';
  color?: Maybe<Scalars['String']>;
  estimatedArea?: Maybe<ProductDimension>;
  fontSize?: Maybe<Scalars['String']>;
  isInside?: Maybe<Scalars['Boolean']>;
  numberOfColors?: Maybe<PostProcessPrintingNumberOfColors>;
  postProcessName: Scalars['String'];
  printingMethod?: Maybe<Scalars['String']>;
};

export type PostProcessDetailInput = {
  color?: InputMaybe<Scalars['String']>;
  estimatedArea?: InputMaybe<ProductDimensionInput>;
  fontSize?: InputMaybe<Scalars['String']>;
  isInside?: InputMaybe<Scalars['Boolean']>;
  numberOfColors?: InputMaybe<PostProcessPrintingNumberOfColorsInput>;
  postProcessName: Scalars['String'];
  printingMethod?: InputMaybe<Scalars['String']>;
};

export type PostProcessPrintingNumberOfColors = {
  __typename?: 'PostProcessPrintingNumberOfColors';
  c: Scalars['String'];
  t: Scalars['String'];
};

export type PostProcessPrintingNumberOfColorsInput = {
  c: Scalars['String'];
  t: Scalars['String'];
};

export type PricingDetail = {
  __typename?: 'PricingDetail';
  price: Scalars['Int'];
  priceId: Scalars['String'];
};

export type Pricings = {
  __typename?: 'Pricings';
  annual?: Maybe<PricingDetail>;
  monthly?: Maybe<PricingDetail>;
  perUser: PricingDetail;
};

export type ProductDimension = {
  __typename?: 'ProductDimension';
  x: Scalars['String'];
  y: Scalars['String'];
  z?: Maybe<Scalars['String']>;
};

export type ProductDimensionInput = {
  x: Scalars['String'];
  y: Scalars['String'];
  z?: InputMaybe<Scalars['String']>;
};

export type Project = ProjectInterface & {
  __typename?: 'Project';
  category: Scalars['String'];
  comments: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectBid = {
  __typename?: 'ProjectBid';
  comments: Scalars['String'];
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  projectId: Scalars['String'];
  status: BidStatus;
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectBidComponent = {
  __typename?: 'ProjectBidComponent';
  id: Scalars['String'];
  projectBidId: Scalars['String'];
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPrice>;
  samplingFee: Scalars['Int'];
  toolingFee?: Maybe<Scalars['Int']>;
};

export type ProjectChangelog = {
  __typename?: 'ProjectChangelog';
  changedAt: Scalars['Date'];
  changes: Array<ProjectPropertyChange>;
  projectId: Scalars['String'];
};

export type ProjectComponent = {
  __typename?: 'ProjectComponent';
  componentSpec: ProjectComponentSpec;
  designs?: Maybe<Array<ProjectDesign>>;
  id: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type ProjectComponentChangelog = {
  __typename?: 'ProjectComponentChangelog';
  changedAt: Scalars['Date'];
  changes: Array<ProjectComponentPropertyChange>;
  projectComponentId: Scalars['String'];
};

export type ProjectComponentPropertyChange = {
  __typename?: 'ProjectComponentPropertyChange';
  newValue?: Maybe<Scalars['JSON']>;
  oldValue?: Maybe<Scalars['JSON']>;
  projectComponentSpecId?: Maybe<Scalars['String']>;
  propertyName: Scalars['String'];
};

export type ProjectComponentSpec = {
  __typename?: 'ProjectComponentSpec';
  boxStyle?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  dimension: ProductDimension;
  finish?: Maybe<Scalars['String']>;
  flute?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  includeArtworkInQuote?: Maybe<Scalars['Boolean']>;
  insideColor?: Maybe<Scalars['String']>;
  insideFinish?: Maybe<Scalars['String']>;
  insideMaterial?: Maybe<Scalars['String']>;
  insideMaterialSource?: Maybe<Scalars['String']>;
  manufacturingProcess?: Maybe<Scalars['String']>;
  material?: Maybe<Scalars['String']>;
  materialSource?: Maybe<Scalars['String']>;
  numberOfPages?: Maybe<Scalars['String']>;
  outsideColor?: Maybe<Scalars['String']>;
  outsideFinish?: Maybe<Scalars['String']>;
  outsideMaterial?: Maybe<Scalars['String']>;
  outsideMaterialSource?: Maybe<Scalars['String']>;
  postProcess?: Maybe<Array<PostProcessDetail>>;
  productName: Scalars['String'];
  purpose?: Maybe<Scalars['String']>;
  shape?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  thickness?: Maybe<Scalars['String']>;
};

export enum ProjectCreationMode {
  Advanced = 'ADVANCED',
  Guided = 'GUIDED'
}

export type ProjectDesign = {
  __typename?: 'ProjectDesign';
  designId: Scalars['String'];
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type ProjectInterface = {
  category: Scalars['String'];
  comments: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectOverview = {
  __typename?: 'ProjectOverview';
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  products: Array<Scalars['String']>;
  targetPrice: Scalars['String'];
};

export enum ProjectPermission {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export type ProjectPropertyChange = {
  __typename?: 'ProjectPropertyChange';
  newValue?: Maybe<Scalars['JSON']>;
  oldValue?: Maybe<Scalars['JSON']>;
  propertyName: Scalars['String'];
};

export enum ProjectStatus {
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Overdue = 'OVERDUE'
}

export type QuantityPrice = {
  __typename?: 'QuantityPrice';
  price: Scalars['String'];
  quantity: Scalars['Int'];
};

export type QuantityPriceInput = {
  price: Scalars['String'];
  quantity: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkCompanyName: Scalars['Boolean'];
  checkUserEmail: Scalars['Boolean'];
  getAllPendingJoinRequests: Array<Scalars['String']>;
  getAllPlans: Array<Plan>;
  getAllUsersWithinCompany: Array<User>;
  getCompanyDetail?: Maybe<CompanyDetail>;
  getCompanyPlanDetail: CompanyPlanDetail;
  getCustomerDetail: CustomerDetail;
  getCustomerProject: CustomerProject;
  getCustomerProjects: Array<CustomerProjectOverview>;
  getPlan: Plan;
  getProjectBid?: Maybe<ProjectBid>;
  getProjectBidUsers: Array<UserProjectPermission>;
  getProjectChangelog: Array<ProjectChangelog>;
  getProjectComponentChangelog: Array<ProjectComponentChangelog>;
  getProjectDetail?: Maybe<Project>;
  getProjectUsers: Array<UserProjectPermission>;
  getUser: User;
  getVendorDetail?: Maybe<VendorDetail>;
  getVendorProject?: Maybe<VendorProject>;
  getVendorProjects: Array<VendorProjectOverview>;
  login: LoggedInUser;
  searchCustomerProjects: Array<ProjectOverview>;
  searchVendorCompanies: Array<VendorOverview>;
};


export type QueryCheckCompanyNameArgs = {
  data: CheckCompanyNameInput;
};


export type QueryCheckUserEmailArgs = {
  data: CheckUserEmailInput;
};


export type QueryGetAllPendingJoinRequestsArgs = {
  data: GetAllPendingJoinRequestsInput;
};


export type QueryGetAllPlansArgs = {
  data: GetAllPlansInput;
};


export type QueryGetAllUsersWithinCompanyArgs = {
  data: GetAllUsersWithinCompanyInput;
};


export type QueryGetCompanyDetailArgs = {
  data?: InputMaybe<GetCompanyDetailInput>;
};


export type QueryGetCompanyPlanDetailArgs = {
  data: GetCompanyPlanDetailInput;
};


export type QueryGetCustomerDetailArgs = {
  data: GetCustomerDetailInput;
};


export type QueryGetCustomerProjectArgs = {
  data: GetCustomerProjectInput;
};


export type QueryGetCustomerProjectsArgs = {
  data: GetCustomerProjectsInput;
};


export type QueryGetPlanArgs = {
  data: GetPlanInput;
};


export type QueryGetProjectBidArgs = {
  data: GetProjectBidInput;
};


export type QueryGetProjectBidUsersArgs = {
  data: GetProjectBidUsersInput;
};


export type QueryGetProjectChangelogArgs = {
  data: GetProjectChangelogInput;
};


export type QueryGetProjectComponentChangelogArgs = {
  data: GetProjectComponentChangelogInput;
};


export type QueryGetProjectDetailArgs = {
  data: GetProjectDetailInput;
};


export type QueryGetProjectUsersArgs = {
  data: GetProjectUsersInput;
};


export type QueryGetUserArgs = {
  data: GetUserInput;
};


export type QueryGetVendorDetailArgs = {
  data?: InputMaybe<GetVendorDetailInput>;
};


export type QueryGetVendorProjectArgs = {
  data: GetVendorProjectInput;
};


export type QueryGetVendorProjectsArgs = {
  data: GetVendorProjectsInput;
};


export type QueryLoginArgs = {
  data: UserLoginInput;
};


export type QuerySearchCustomerProjectsArgs = {
  data: SearchCustomerProjectInput;
};


export type QuerySearchVendorCompaniesArgs = {
  data: SearchVendorCompanyInput;
};

export type RequestToJoinInput = {
  companyName: Scalars['String'];
  email: Scalars['String'];
};

export type SearchCustomerProjectInput = {
  deliveryDate?: InputMaybe<Scalars['String']>;
  orderQuantities?: InputMaybe<Array<Scalars['String']>>;
  targetPrice?: InputMaybe<Scalars['String']>;
  userInput: Scalars['String'];
};

export type SearchVendorCompanyInput = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  factoryLocations?: InputMaybe<Array<Scalars['String']>>;
  leadTime?: InputMaybe<Scalars['String']>;
  moqMax?: InputMaybe<Scalars['String']>;
  moqMin?: InputMaybe<Scalars['String']>;
  userInput: Scalars['String'];
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  clientSecret: Scalars['String'];
  subscriptionId: Scalars['String'];
};

export type UpdateCompanyPlanInput = {
  companyId: Scalars['String'];
  planId: Scalars['String'];
};

export type UpdateCompanyPlanSubscriptionInfoInput = {
  subscriptionId: Scalars['String'];
};

export type UpdateCompanyStatusInput = {
  companyId: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type UpdateCustomerInfoInput = {
  companyId: Scalars['String'];
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateProjectBidComponentInput = {
  id: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
};

export type UpdateProjectBidInput = {
  comments: Scalars['String'];
  components: Array<UpdateProjectBidComponentInput>;
  id: Scalars['String'];
};

export type UpdateProjectBidPermissionsInput = {
  editors: UpdateProjectBidPermissionsInputData;
  viewers: UpdateProjectBidPermissionsInputData;
};

export type UpdateProjectBidPermissionsInputData = {
  permission: ProjectPermission;
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
  userIds: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateProjectComponentInput = {
  componentId: Scalars['String'];
  componentSpec: UpdateProjectComponentSpecInput;
  designIds?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};

export type UpdateProjectComponentSpecInput = {
  boxStyle?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  componentSpecId: Scalars['String'];
  dimension: ProductDimensionInput;
  finish?: InputMaybe<Scalars['String']>;
  flute?: InputMaybe<Scalars['String']>;
  includeArtworkInQuote?: InputMaybe<Scalars['Boolean']>;
  insideColor?: InputMaybe<Scalars['String']>;
  insideFinish?: InputMaybe<Scalars['String']>;
  insideMaterial?: InputMaybe<Scalars['String']>;
  insideMaterialSource?: InputMaybe<Scalars['String']>;
  manufacturingProcess?: InputMaybe<Scalars['String']>;
  material?: InputMaybe<Scalars['String']>;
  materialSource?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['String']>;
  outsideColor?: InputMaybe<Scalars['String']>;
  outsideFinish?: InputMaybe<Scalars['String']>;
  outsideMaterial?: InputMaybe<Scalars['String']>;
  outsideMaterialSource?: InputMaybe<Scalars['String']>;
  postProcess?: InputMaybe<Array<PostProcessDetailInput>>;
  productName: Scalars['String'];
  purpose?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  thickness?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  category: Scalars['String'];
  comments?: InputMaybe<Scalars['String']>;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  projectId: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
};

export type UpdateProjectPermissionsInput = {
  editors: UpdateProjectPermissionsInputData;
  viewers: UpdateProjectPermissionsInputData;
};

export type UpdateProjectPermissionsInputData = {
  permission: ProjectPermission;
  projectId: Scalars['String'];
  userIds: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateStripeSubscriptionInput = {
  subscriptionId: Scalars['String'];
};

export type UpdateUserInfoInput = {
  name?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateUserPowerInput = {
  power: UserPower;
  userId: Scalars['String'];
};

export type UpdateVendorInfoInput = {
  companyId: Scalars['String'];
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  products: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  power: UserPower;
  status?: Maybe<UserStatus>;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum UserPower {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserProjectPermission = {
  __typename?: 'UserProjectPermission';
  email: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  userId: Scalars['String'];
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type VendorDetail = {
  __typename?: 'VendorDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  products: Array<Scalars['String']>;
};

export type VendorOverview = {
  __typename?: 'VendorOverview';
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  products: Array<Scalars['String']>;
};

export type VendorProject = ProjectInterface & {
  __typename?: 'VendorProject';
  bidInfo: PermissionedProjectBid;
  category: Scalars['String'];
  comments: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type VendorProjectOverview = {
  __typename?: 'VendorProjectOverview';
  bidId: Scalars['String'];
  bidStatus: BidStatus;
  category: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};
