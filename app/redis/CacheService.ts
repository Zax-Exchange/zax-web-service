import { createClient } from 'redis';
import { User } from '../graphql/resolvers-types.generated';

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

  static readonly USER_TTL_MS = 300000;   // 300000ms is 5 mins 

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