import { createClient } from 'redis';
import { Project, User } from '../graphql/resolvers-types.generated';
import { projectsAttributes } from '../models/projects';

const port = process.env.CACHE_PORT
const host = process.env.CACHE_HOST
const db = process.env.CACHE_DB

if (host === undefined) {
  throw new Error(`invalid host ${host}`)
}
if (port === undefined || isNaN(Number(port))) {
  throw new Error(`invalid port ${port}`)
}
if (db === undefined || isNaN(Number(db))) {
  throw new Error(`invalid db ${db}`)
}

const connectionString = `redis://${host}:${port}/${db}`;

class CacheService {

  static readonly PROJECT_TTL_MS = 600000;    // 600000ms is 10 mins 
  static readonly USER_TTL_MS = 300000;       // 300000ms is 5 mins 

  private readonly client;

  constructor(connectionString: string) {
    this.client = createClient({
      url: connectionString
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    console.log(`connecting to redis at ${connectionString}`);
    const connectionPromise = this.client.connect();
    connectionPromise.then(() => {
      console.log(`connected to redis at ${connectionString}`);
    }, () => {
      console.error(`could not connect to redis at ${connectionString}`);
    })
  }

  /*
   * Project Cacheing Methods
   */

  private getProjectCacheKey(projectId: string): string {
    return `PROJECT:{${projectId}}`;
  }

  private getDetailedProjectCacheKey(projectId: string): string {
    return `DETAILED_PROJECT:{${projectId}}`;
  }

  async getProjectInCache(projectId: string): Promise<projectsAttributes|null> {
    try {
      const cacheKey = this.getProjectCacheKey(projectId);
      const valueInCacheString: string = (await this.client.GET(cacheKey))!;
      const valueInCache = JSON.parse(valueInCacheString) as projectsAttributes
      return Promise.resolve(valueInCache);
    } catch (err) {
      console.error(`Error retrieving project ${projectId} from cache`, err)
      return Promise.resolve(null);
    }
  }

  async setProjectInCache(value: projectsAttributes): Promise<boolean> {
    try {
      const projectId: string = value.id;
      const cacheKey = this.getProjectCacheKey(projectId);
      const valueAsString = JSON.stringify(value);
      const response: string = (await this.client.SET(cacheKey, valueAsString, {PX: CacheService.PROJECT_TTL_MS}))!;
      return Promise.resolve(response === "OK");
    } catch (err) {
      console.error(`Error storing project ${value} into cache`, err)
      return Promise.resolve(false);
    }
  }

  async getDetailedProjectInCache(projectId: string): Promise<Project|null> {
    try {
      const cacheKey = this.getDetailedProjectCacheKey(projectId);
      const valueInCacheString: string = (await this.client.GET(cacheKey))!;
      const valueInCache = JSON.parse(valueInCacheString) as Project
      return Promise.resolve(valueInCache);
    } catch (err) {
      console.error(`Error retrieving detailed project ${projectId} from cache`, err)
      return Promise.resolve(null);
    }
  }

  async setDetailedProjectInCache(value: Project): Promise<boolean> {
    try {
      const projectId: string = value.id;
      const cacheKey = this.getDetailedProjectCacheKey(projectId);
      const valueAsString = JSON.stringify(value);
      const response: string = (await this.client.SET(cacheKey, valueAsString, {PX: CacheService.PROJECT_TTL_MS}))!;
      return Promise.resolve(response === "OK");
    } catch (err) {
      console.error(`Error storing detailed project ${value} into cache`, err)
      return Promise.resolve(false);
    }
  }

  async invalidateProjectInCache(projectId: string): Promise<number> {
    try {
      const cacheKey = this.getProjectCacheKey(projectId);
      const cacheKeyDetailed = this.getDetailedProjectCacheKey(projectId);
      const numDeleted = await Promise.all([
        this.client.DEL(cacheKey),
        this.client.DEL(cacheKeyDetailed)
      ]);
      return numDeleted[0] + numDeleted[1]
    } catch (err) {
      console.error(`Error invalidating project ${projectId} into cache`, err)
      return Promise.resolve(0);
    }
  }

  /*
   * User Cacheing Methods
   */

  private getUserCacheKey(userId: string): string {
    return `USER:{${userId}}`;
  }

  async getUserInCache(userId: string): Promise<User|null> {
    try {
      const cacheKey = this.getUserCacheKey(userId);
      const valueInCacheString: string = (await this.client.GET(cacheKey))!;
      const valueInCache = JSON.parse(valueInCacheString) as User
      return Promise.resolve(valueInCache);
    } catch (err) {
      console.error(`Error retrieving user ${userId} from cache`, err)
      return Promise.resolve(null);
    }
  }

  async setUserInCache(value: User): Promise<boolean> {
    try {
      const userId: string = value.id;
      const cacheKey = this.getUserCacheKey(userId);
      const valueAsString = JSON.stringify(value);
      const response: string = (await this.client.SET(cacheKey, valueAsString, {PX: CacheService.USER_TTL_MS}))!;
      return Promise.resolve(response === "OK");
    } catch (err) {
      console.error(`Error storing user ${value} into cache`, err)
      return Promise.resolve(false);
    }
  }

  async invalidateUserInCache(userId: string): Promise<number> {
    try {
      const cacheKey = this.getUserCacheKey(userId);
      return await this.client.DEL(cacheKey);
    } catch (err) {
      console.error(`Error invalidating user ${userId} into cache`, err)
      return Promise.resolve(0);
    }
  }
}

const cacheService = new CacheService(connectionString);
export default cacheService;