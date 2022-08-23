import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum BidStatus {
  Accepted = 'ACCEPTED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export type CompanyDetail = {
  __typename?: 'CompanyDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  logo?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<Scalars['String']>>>;
  moq?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['String'];
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
};

export type CreateProjectBidInput = {
  comments: Scalars['String'];
  components: Array<CreateProjectBidComponentInput>;
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProjectComponentInput = {
  dimension: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
};

export type CreateProjectInput = {
  budget: Scalars['Int'];
  comments: Scalars['String'];
  components: Array<CreateProjectComponentInput>;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  designId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
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
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
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

export type CustomerProject = {
  __typename?: 'CustomerProject';
  bids?: Maybe<Array<Maybe<ProjectBid>>>;
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteProjectBidPermissionsInput = {
  projectBidId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
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

export type GetPermissionedCompanyInput = {
  companyId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetProjectBidInput = {
  projectBidId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  chatToken: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  notificationToken: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Scalars['String'];
  createCustomerSubscription: StripeSubscription;
  createProject: Scalars['Boolean'];
  createProjectBid: Scalars['Boolean'];
  createStripeCustomer: Scalars['String'];
  createUser: LoggedInUser;
  createVendor: Scalars['String'];
  createVendorSubscription: StripeSubscription;
  deactivateUser: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteProjectBidPermissions: Scalars['Boolean'];
  deleteProjectPermissions: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  updateCompanyPlan: Scalars['Boolean'];
  updateCompanyPlanSubscriptionInfo: Scalars['Boolean'];
  updateCompanyStatus: Scalars['Boolean'];
  updateCustomer: Scalars['Boolean'];
  updateProjectBidPermissions: Scalars['Boolean'];
  updateProjectPermissions: Scalars['Boolean'];
  updateSubscription: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  updateUserPassword: Scalars['Boolean'];
  updateUserPower: Scalars['Boolean'];
  updateVendor: Scalars['Boolean'];
  uploadProjectDesign: Scalars['String'];
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


export type MutationCreateStripeCustomerArgs = {
  email?: InputMaybe<Scalars['String']>;
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
  email: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteProjectBidPermissionsArgs = {
  data: DeleteProjectBidPermissionsInput;
};


export type MutationDeleteProjectPermissionsArgs = {
  data: DeleteProjectPermissionsInput;
};


export type MutationInviteUserArgs = {
  email: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationResetArgs = {
  t?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCompanyPlanArgs = {
  data: UpdateCompanyPlanInput;
};


export type MutationUpdateCompanyPlanSubscriptionInfoArgs = {
  subscriptionId: Scalars['String'];
};


export type MutationUpdateCompanyStatusArgs = {
  companyId: Scalars['String'];
  isActive: Scalars['Boolean'];
};


export type MutationUpdateCustomerArgs = {
  data: UpdateCustomerInput;
};


export type MutationUpdateProjectBidPermissionsArgs = {
  data: UpdateProjectBidPermissionsInput;
};


export type MutationUpdateProjectPermissionsArgs = {
  data: UpdateProjectPermissionsInput;
};


export type MutationUpdateSubscriptionArgs = {
  subscriptionId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};


export type MutationUpdateUserPowerArgs = {
  data: UpdateUserPowerInput;
};


export type MutationUpdateVendorArgs = {
  data: UpdateVendorInput;
};


export type MutationUploadProjectDesignArgs = {
  file: Scalars['Upload'];
};

export type PermissionedCompany = {
  __typename?: 'PermissionedCompany';
  companyUrl: Scalars['String'];
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  fax: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  logo: Scalars['String'];
  materials?: Maybe<Array<Maybe<Scalars['String']>>>;
  moq?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planInfo: CompanyPlan;
  updatedAt: Scalars['String'];
};

export type PermissionedProjectBid = {
  __typename?: 'PermissionedProjectBid';
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  permission: ProjectPermission;
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type Project = {
  __typename?: 'Project';
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type ProjectBid = {
  __typename?: 'ProjectBid';
  comments: Scalars['String'];
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  project: Project;
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type ProjectBidComponent = {
  __typename?: 'ProjectBidComponent';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  projectBidId: Scalars['String'];
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPrice>;
  updatedAt: Scalars['String'];
};

export type ProjectComponent = {
  __typename?: 'ProjectComponent';
  createdAt: Scalars['String'];
  dimension: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProjectDesign = {
  __typename?: 'ProjectDesign';
  fileName: Scalars['String'];
  url: Scalars['String'];
};

export type ProjectOverview = {
  __typename?: 'ProjectOverview';
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
};

export enum ProjectPermission {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export enum ProjectStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export type QuantityPrice = {
  __typename?: 'QuantityPrice';
  price: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type QuantityPriceInput = {
  price: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkCompanyName: Scalars['Boolean'];
  checkUserEmail: Scalars['Boolean'];
  getAllPlans: Array<Plan>;
  getAllUsersWithinCompany: Array<User>;
  getCompanyDetail?: Maybe<CompanyDetail>;
  getCompanyPlanDetail: CompanyPlanDetail;
  getCompanyPlanWithCompanyId: CompanyPlanDetail;
  getCustomerDetail: CustomerDetail;
  getCustomerProject: CustomerProject;
  getCustomerProjects: Array<CustomerProject>;
  getPlanWithPlanId: Plan;
  getProjectBidUsers: Array<UserPermission>;
  getProjectDetail: Project;
  getProjectUsers: Array<UserPermission>;
  getUserWithUserId: User;
  getVendorDetail: VendorDetail;
  getVendorProject: VendorProject;
  getVendorProjects: Array<Maybe<VendorProject>>;
  login: LoggedInUser;
  searchCustomerProjects: Array<ProjectOverview>;
  searchVendorCompanies?: Maybe<Array<Maybe<VendorOverview>>>;
};


export type QueryCheckCompanyNameArgs = {
  name: Scalars['String'];
};


export type QueryCheckUserEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetAllPlansArgs = {
  isVendor: Scalars['Boolean'];
};


export type QueryGetAllUsersWithinCompanyArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyDetailArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyPlanDetailArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyPlanWithCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCustomerDetailArgs = {
  companyId: Scalars['String'];
};


export type QueryGetCustomerProjectArgs = {
  data: GetProjectInput;
};


export type QueryGetCustomerProjectsArgs = {
  userId: Scalars['String'];
};


export type QueryGetPlanWithPlanIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectBidUsersArgs = {
  projectBidId: Scalars['String'];
};


export type QueryGetProjectDetailArgs = {
  projectId: Scalars['String'];
};


export type QueryGetProjectUsersArgs = {
  projectId: Scalars['String'];
};


export type QueryGetUserWithUserIdArgs = {
  paranoid?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};


export type QueryGetVendorDetailArgs = {
  companyId: Scalars['String'];
};


export type QueryGetVendorProjectArgs = {
  data: GetProjectInput;
};


export type QueryGetVendorProjectsArgs = {
  userId: Scalars['String'];
};


export type QueryLoginArgs = {
  data: UserLoginInput;
};


export type QuerySearchCustomerProjectsArgs = {
  searchInput: SearchProjectInput;
};


export type QuerySearchVendorCompaniesArgs = {
  searchInput: SearchCompanyInput;
};

export type SearchCompanyInput = {
  leadTime?: InputMaybe<Scalars['Int']>;
  locations?: InputMaybe<Array<Scalars['String']>>;
  moq?: InputMaybe<Scalars['Int']>;
  userInput: Scalars['String'];
};

export type SearchProjectInput = {
  budget?: InputMaybe<Scalars['Int']>;
  deliveryCities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deliveryCountries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  leadTime?: InputMaybe<Scalars['Int']>;
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

export type UpdateCustomerInput = {
  data: UpdateCustomerInputData;
  id: Scalars['String'];
};

export type UpdateCustomerInputData = {
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
  dimension: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
};

export type UpdateProjectInput = {
  budget: Scalars['Int'];
  components: Array<UpdateProjectComponentInput>;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
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

export type UpdateUserInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdateUserPowerInput = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type UpdateVendorInput = {
  data: UpdateVendorInputData;
  id: Scalars['String'];
};

export type UpdateVendorInputData = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  email: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  userId: Scalars['String'];
};

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
  locations: Array<Maybe<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Maybe<Scalars['String']>>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type VendorOverview = {
  __typename?: 'VendorOverview';
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Maybe<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Maybe<Scalars['String']>>;
  moq: Scalars['String'];
  name: Scalars['String'];
};

export type VendorProject = {
  __typename?: 'VendorProject';
  bidInfo: PermissionedProjectBid;
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  customerName: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BidStatus: BidStatus;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CompanyDetail: ResolverTypeWrapper<CompanyDetail>;
  CompanyPermission: CompanyPermission;
  CompanyPlan: ResolverTypeWrapper<CompanyPlan>;
  CompanyPlanDetail: ResolverTypeWrapper<CompanyPlanDetail>;
  CompanySize: CompanySize;
  CreateCustomerInput: CreateCustomerInput;
  CreateProjectBidComponentInput: CreateProjectBidComponentInput;
  CreateProjectBidInput: CreateProjectBidInput;
  CreateProjectComponentInput: CreateProjectComponentInput;
  CreateProjectInput: CreateProjectInput;
  CreateUserInput: CreateUserInput;
  CreateVendorInput: CreateVendorInput;
  CreateVendorSubscriptionInput: CreateVendorSubscriptionInput;
  CustomerDetail: ResolverTypeWrapper<CustomerDetail>;
  CustomerOverview: ResolverTypeWrapper<CustomerOverview>;
  CustomerProject: ResolverTypeWrapper<CustomerProject>;
  DeleteProjectBidPermissionsInput: DeleteProjectBidPermissionsInput;
  DeleteProjectInput: DeleteProjectInput;
  DeleteProjectPermissionsInput: DeleteProjectPermissionsInput;
  File: ResolverTypeWrapper<File>;
  FileUploadResponse: ResolverTypeWrapper<FileUploadResponse>;
  GetPermissionedCompanyInput: GetPermissionedCompanyInput;
  GetProjectBidInput: GetProjectBidInput;
  GetProjectInput: GetProjectInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoggedInUser: ResolverTypeWrapper<LoggedInUser>;
  Mutation: ResolverTypeWrapper<{}>;
  PermissionedCompany: ResolverTypeWrapper<PermissionedCompany>;
  PermissionedProjectBid: ResolverTypeWrapper<PermissionedProjectBid>;
  Plan: ResolverTypeWrapper<Plan>;
  PlanTier: PlanTier;
  PricingDetail: ResolverTypeWrapper<PricingDetail>;
  Pricings: ResolverTypeWrapper<Pricings>;
  Project: ResolverTypeWrapper<Project>;
  ProjectBid: ResolverTypeWrapper<ProjectBid>;
  ProjectBidComponent: ResolverTypeWrapper<ProjectBidComponent>;
  ProjectComponent: ResolverTypeWrapper<ProjectComponent>;
  ProjectDesign: ResolverTypeWrapper<ProjectDesign>;
  ProjectOverview: ResolverTypeWrapper<ProjectOverview>;
  ProjectPermission: ProjectPermission;
  ProjectStatus: ProjectStatus;
  QuantityPrice: ResolverTypeWrapper<QuantityPrice>;
  QuantityPriceInput: QuantityPriceInput;
  Query: ResolverTypeWrapper<{}>;
  SearchCompanyInput: SearchCompanyInput;
  SearchProjectInput: SearchProjectInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  StripeSubscription: ResolverTypeWrapper<StripeSubscription>;
  UpdateCompanyPlanInput: UpdateCompanyPlanInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateCustomerInputData: UpdateCustomerInputData;
  UpdateProjectBidComponentInput: UpdateProjectBidComponentInput;
  UpdateProjectBidInput: UpdateProjectBidInput;
  UpdateProjectBidPermissionsInput: UpdateProjectBidPermissionsInput;
  UpdateProjectBidPermissionsInputData: UpdateProjectBidPermissionsInputData;
  UpdateProjectComponentInput: UpdateProjectComponentInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectPermissionsInput: UpdateProjectPermissionsInput;
  UpdateProjectPermissionsInputData: UpdateProjectPermissionsInputData;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPowerInput: UpdateUserPowerInput;
  UpdateVendorInput: UpdateVendorInput;
  UpdateVendorInputData: UpdateVendorInputData;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserLoginInput: UserLoginInput;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  VendorDetail: ResolverTypeWrapper<VendorDetail>;
  VendorOverview: ResolverTypeWrapper<VendorOverview>;
  VendorProject: ResolverTypeWrapper<VendorProject>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CompanyDetail: CompanyDetail;
  CompanyPlan: CompanyPlan;
  CompanyPlanDetail: CompanyPlanDetail;
  CreateCustomerInput: CreateCustomerInput;
  CreateProjectBidComponentInput: CreateProjectBidComponentInput;
  CreateProjectBidInput: CreateProjectBidInput;
  CreateProjectComponentInput: CreateProjectComponentInput;
  CreateProjectInput: CreateProjectInput;
  CreateUserInput: CreateUserInput;
  CreateVendorInput: CreateVendorInput;
  CreateVendorSubscriptionInput: CreateVendorSubscriptionInput;
  CustomerDetail: CustomerDetail;
  CustomerOverview: CustomerOverview;
  CustomerProject: CustomerProject;
  DeleteProjectBidPermissionsInput: DeleteProjectBidPermissionsInput;
  DeleteProjectInput: DeleteProjectInput;
  DeleteProjectPermissionsInput: DeleteProjectPermissionsInput;
  File: File;
  FileUploadResponse: FileUploadResponse;
  GetPermissionedCompanyInput: GetPermissionedCompanyInput;
  GetProjectBidInput: GetProjectBidInput;
  GetProjectInput: GetProjectInput;
  Int: Scalars['Int'];
  LoggedInUser: LoggedInUser;
  Mutation: {};
  PermissionedCompany: PermissionedCompany;
  PermissionedProjectBid: PermissionedProjectBid;
  Plan: Plan;
  PricingDetail: PricingDetail;
  Pricings: Pricings;
  Project: Project;
  ProjectBid: ProjectBid;
  ProjectBidComponent: ProjectBidComponent;
  ProjectComponent: ProjectComponent;
  ProjectDesign: ProjectDesign;
  ProjectOverview: ProjectOverview;
  QuantityPrice: QuantityPrice;
  QuantityPriceInput: QuantityPriceInput;
  Query: {};
  SearchCompanyInput: SearchCompanyInput;
  SearchProjectInput: SearchProjectInput;
  String: Scalars['String'];
  StripeSubscription: StripeSubscription;
  UpdateCompanyPlanInput: UpdateCompanyPlanInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateCustomerInputData: UpdateCustomerInputData;
  UpdateProjectBidComponentInput: UpdateProjectBidComponentInput;
  UpdateProjectBidInput: UpdateProjectBidInput;
  UpdateProjectBidPermissionsInput: UpdateProjectBidPermissionsInput;
  UpdateProjectBidPermissionsInputData: UpdateProjectBidPermissionsInputData;
  UpdateProjectComponentInput: UpdateProjectComponentInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectPermissionsInput: UpdateProjectPermissionsInput;
  UpdateProjectPermissionsInputData: UpdateProjectPermissionsInputData;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPowerInput: UpdateUserPowerInput;
  UpdateVendorInput: UpdateVendorInput;
  UpdateVendorInputData: UpdateVendorInputData;
  Upload: Scalars['Upload'];
  User: User;
  UserLoginInput: UserLoginInput;
  UserPermission: UserPermission;
  VendorDetail: VendorDetail;
  VendorOverview: VendorOverview;
  VendorProject: VendorProject;
}>;

export type CompanyDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyDetail'] = ResolversParentTypes['CompanyDetail']> = ResolversObject<{
  companyUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  leadTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  moq?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompanyPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyPlan'] = ResolversParentTypes['CompanyPlan']> = ResolversObject<{
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  planId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompanyPlanDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyPlanDetail'] = ResolversParentTypes['CompanyPlanDetail']> = ResolversObject<{
  billingFrequency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memberSince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subscriptionEndDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscriptionStartDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tier?: Resolver<ResolversTypes['PlanTier'], ParentType, ContextType>;
  trialEndDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trialStartDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerDetail'] = ResolversParentTypes['CustomerDetail']> = ResolversObject<{
  companyUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerOverviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerOverview'] = ResolversParentTypes['CustomerOverview']> = ResolversObject<{
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerProject'] = ResolversParentTypes['CustomerProject']> = ResolversObject<{
  bids?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectBid']>>>, ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  components?: Resolver<Array<ResolversTypes['ProjectComponent']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  design?: Resolver<Maybe<ResolversTypes['ProjectDesign']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['ProjectPermission'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FileUploadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileUploadResponse'] = ResolversParentTypes['FileUploadResponse']> = ResolversObject<{
  Bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ETag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedInUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedInUser'] = ResolversParentTypes['LoggedInUser']> = ResolversObject<{
  chatToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notificationToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCustomer?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'data'>>;
  createCustomerSubscription?: Resolver<ResolversTypes['StripeSubscription'], ParentType, ContextType, RequireFields<MutationCreateCustomerSubscriptionArgs, 'priceId' | 'stripeCustomerId'>>;
  createProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>;
  createProjectBid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateProjectBidArgs, 'data'>>;
  createStripeCustomer?: Resolver<ResolversTypes['String'], ParentType, ContextType, Partial<MutationCreateStripeCustomerArgs>>;
  createUser?: Resolver<ResolversTypes['LoggedInUser'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createVendor?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateVendorArgs, 'data'>>;
  createVendorSubscription?: Resolver<ResolversTypes['StripeSubscription'], ParentType, ContextType, RequireFields<MutationCreateVendorSubscriptionArgs, 'data'>>;
  deactivateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeactivateUserArgs, 'email'>>;
  deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteProjectBidPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectBidPermissionsArgs, 'data'>>;
  deleteProjectPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectPermissionsArgs, 'data'>>;
  inviteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'email' | 'userId'>>;
  reset?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, Partial<MutationResetArgs>>;
  updateCompanyPlan?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCompanyPlanArgs, 'data'>>;
  updateCompanyPlanSubscriptionInfo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCompanyPlanSubscriptionInfoArgs, 'subscriptionId'>>;
  updateCompanyStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCompanyStatusArgs, 'companyId' | 'isActive'>>;
  updateCustomer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'data'>>;
  updateProjectBidPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProjectBidPermissionsArgs, 'data'>>;
  updateProjectPermissions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProjectPermissionsArgs, 'data'>>;
  updateSubscription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateSubscriptionArgs, 'subscriptionId'>>;
  updateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
  updateUserPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'data'>>;
  updateUserPower?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserPowerArgs, 'data'>>;
  updateVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateVendorArgs, 'data'>>;
  uploadProjectDesign?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUploadProjectDesignArgs, 'file'>>;
}>;

export type PermissionedCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionedCompany'] = ResolversParentTypes['PermissionedCompany']> = ResolversObject<{
  companyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fax?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  leadTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  moq?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  planInfo?: Resolver<ResolversTypes['CompanyPlan'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PermissionedProjectBidResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionedProjectBid'] = ResolversParentTypes['PermissionedProjectBid']> = ResolversObject<{
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  components?: Resolver<Array<ResolversTypes['ProjectBidComponent']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['ProjectPermission'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plan'] = ResolversParentTypes['Plan']> = ResolversObject<{
  companySize?: Resolver<Maybe<ResolversTypes['CompanySize']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pricings?: Resolver<ResolversTypes['Pricings'], ParentType, ContextType>;
  tier?: Resolver<ResolversTypes['PlanTier'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PricingDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['PricingDetail'] = ResolversParentTypes['PricingDetail']> = ResolversObject<{
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  priceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PricingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pricings'] = ResolversParentTypes['Pricings']> = ResolversObject<{
  annual?: Resolver<Maybe<ResolversTypes['PricingDetail']>, ParentType, ContextType>;
  monthly?: Resolver<Maybe<ResolversTypes['PricingDetail']>, ParentType, ContextType>;
  perUser?: Resolver<ResolversTypes['PricingDetail'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  budget?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  components?: Resolver<Array<ResolversTypes['ProjectComponent']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  design?: Resolver<Maybe<ResolversTypes['ProjectDesign']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectBidResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectBid'] = ResolversParentTypes['ProjectBid']> = ResolversObject<{
  comments?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  components?: Resolver<Array<ResolversTypes['ProjectBidComponent']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectBidComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectBidComponent'] = ResolversParentTypes['ProjectBidComponent']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectBidId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectComponentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantityPrices?: Resolver<Array<ResolversTypes['QuantityPrice']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectComponent'] = ResolversParentTypes['ProjectComponent']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dimension?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  materials?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postProcess?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectDesignResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectDesign'] = ResolversParentTypes['ProjectDesign']> = ResolversObject<{
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectOverviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectOverview'] = ResolversParentTypes['ProjectOverview']> = ResolversObject<{
  budget?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  materials?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QuantityPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuantityPrice'] = ResolversParentTypes['QuantityPrice']> = ResolversObject<{
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  checkCompanyName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckCompanyNameArgs, 'name'>>;
  checkUserEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUserEmailArgs, 'email'>>;
  getAllPlans?: Resolver<Array<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryGetAllPlansArgs, 'isVendor'>>;
  getAllUsersWithinCompany?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetAllUsersWithinCompanyArgs>>;
  getCompanyDetail?: Resolver<Maybe<ResolversTypes['CompanyDetail']>, ParentType, ContextType, Partial<QueryGetCompanyDetailArgs>>;
  getCompanyPlanDetail?: Resolver<ResolversTypes['CompanyPlanDetail'], ParentType, ContextType, Partial<QueryGetCompanyPlanDetailArgs>>;
  getCompanyPlanWithCompanyId?: Resolver<ResolversTypes['CompanyPlanDetail'], ParentType, ContextType, Partial<QueryGetCompanyPlanWithCompanyIdArgs>>;
  getCustomerDetail?: Resolver<ResolversTypes['CustomerDetail'], ParentType, ContextType, RequireFields<QueryGetCustomerDetailArgs, 'companyId'>>;
  getCustomerProject?: Resolver<ResolversTypes['CustomerProject'], ParentType, ContextType, RequireFields<QueryGetCustomerProjectArgs, 'data'>>;
  getCustomerProjects?: Resolver<Array<ResolversTypes['CustomerProject']>, ParentType, ContextType, RequireFields<QueryGetCustomerProjectsArgs, 'userId'>>;
  getPlanWithPlanId?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, RequireFields<QueryGetPlanWithPlanIdArgs, 'id'>>;
  getProjectBidUsers?: Resolver<Array<ResolversTypes['UserPermission']>, ParentType, ContextType, RequireFields<QueryGetProjectBidUsersArgs, 'projectBidId'>>;
  getProjectDetail?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectDetailArgs, 'projectId'>>;
  getProjectUsers?: Resolver<Array<ResolversTypes['UserPermission']>, ParentType, ContextType, RequireFields<QueryGetProjectUsersArgs, 'projectId'>>;
  getUserWithUserId?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserWithUserIdArgs, 'userId'>>;
  getVendorDetail?: Resolver<ResolversTypes['VendorDetail'], ParentType, ContextType, RequireFields<QueryGetVendorDetailArgs, 'companyId'>>;
  getVendorProject?: Resolver<ResolversTypes['VendorProject'], ParentType, ContextType, RequireFields<QueryGetVendorProjectArgs, 'data'>>;
  getVendorProjects?: Resolver<Array<Maybe<ResolversTypes['VendorProject']>>, ParentType, ContextType, RequireFields<QueryGetVendorProjectsArgs, 'userId'>>;
  login?: Resolver<ResolversTypes['LoggedInUser'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'data'>>;
  searchCustomerProjects?: Resolver<Array<ResolversTypes['ProjectOverview']>, ParentType, ContextType, RequireFields<QuerySearchCustomerProjectsArgs, 'searchInput'>>;
  searchVendorCompanies?: Resolver<Maybe<Array<Maybe<ResolversTypes['VendorOverview']>>>, ParentType, ContextType, RequireFields<QuerySearchVendorCompaniesArgs, 'searchInput'>>;
}>;

export type StripeSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StripeSubscription'] = ResolversParentTypes['StripeSubscription']> = ResolversObject<{
  clientSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscriptionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVendor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPermission'] = ResolversParentTypes['UserPermission']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['ProjectPermission'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VendorDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorDetail'] = ResolversParentTypes['VendorDetail']> = ResolversObject<{
  companyUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  leadTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  locations?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  materials?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  moq?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VendorOverviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorOverview'] = ResolversParentTypes['VendorOverview']> = ResolversObject<{
  contactEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  leadTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  locations?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  materials?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  moq?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VendorProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorProject'] = ResolversParentTypes['VendorProject']> = ResolversObject<{
  bidInfo?: Resolver<ResolversTypes['PermissionedProjectBid'], ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  components?: Resolver<Array<ResolversTypes['ProjectComponent']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  design?: Resolver<Maybe<ResolversTypes['ProjectDesign']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['ProjectPermission'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CompanyDetail?: CompanyDetailResolvers<ContextType>;
  CompanyPlan?: CompanyPlanResolvers<ContextType>;
  CompanyPlanDetail?: CompanyPlanDetailResolvers<ContextType>;
  CustomerDetail?: CustomerDetailResolvers<ContextType>;
  CustomerOverview?: CustomerOverviewResolvers<ContextType>;
  CustomerProject?: CustomerProjectResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FileUploadResponse?: FileUploadResponseResolvers<ContextType>;
  LoggedInUser?: LoggedInUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PermissionedCompany?: PermissionedCompanyResolvers<ContextType>;
  PermissionedProjectBid?: PermissionedProjectBidResolvers<ContextType>;
  Plan?: PlanResolvers<ContextType>;
  PricingDetail?: PricingDetailResolvers<ContextType>;
  Pricings?: PricingsResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectBid?: ProjectBidResolvers<ContextType>;
  ProjectBidComponent?: ProjectBidComponentResolvers<ContextType>;
  ProjectComponent?: ProjectComponentResolvers<ContextType>;
  ProjectDesign?: ProjectDesignResolvers<ContextType>;
  ProjectOverview?: ProjectOverviewResolvers<ContextType>;
  QuantityPrice?: QuantityPriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StripeSubscription?: StripeSubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserPermission?: UserPermissionResolvers<ContextType>;
  VendorDetail?: VendorDetailResolvers<ContextType>;
  VendorOverview?: VendorOverviewResolvers<ContextType>;
  VendorProject?: VendorProjectResolvers<ContextType>;
}>;

